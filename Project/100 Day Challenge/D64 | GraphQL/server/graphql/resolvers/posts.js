const Post = require("../../models/Post");
const { AuthenticationError } = require("apollo-server");

// Validate if the token is still valid or not. If something wrong with the token, throw an error from check-auth.js
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      const posts = await Post.find().sort({ createdAt: -1 });
      console.log("This is all posts:", posts);
      return posts;
    },
    async getPost(parent, { postId }, ctx, info) {
      try {
        const post = await Post.findById({ postId });
        if (post) {
          console.log("Single post:", post);
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    async createPost(parent, { body }, ctx, info) {
      const user = checkAuth(ctx);
      console.log("THIS IS createPOST Mutation: ", user);
      const newPost = await Post.create({
        body,
        user: user.indexOf,
        username: user.username,
      });

      console.log("New post was created: ", newPost);
      ctx.pubsub.publish("NEW_POST", {
        newPost: post,
      });
      return newPost;
    },
    async deletePost(parent, { postId }, ctx, info) {
      const user = checkAuth(ctx);
      console.log(user.username, postId);
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return "The post does not exist";
        }
        if (user.username == post.username) {
          const deletedPost = await Post.findByIdAndDelete(postId);
          return "Post was deleted";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }, info) =>
        pubsub.asyncIterator("NEW_POST"),
    },
  },
};
