const Post = require("../../models/Post");
const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

// Validate if the token is still valid or not. If something wrong with the token, throw an error from check-auth.js
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    createComment: async (parent, { postId, body }, ctx, info) => {
      const { username } = checkAuth(ctx);

      if (!body.length) {
        throw UserInputError("Empty comment", { errors });
      }
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return "The post does not exist";
        }

        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        }
      } catch (err) {
        console.log(err);
      }
    },
    deleteComment: async (parent, { postId, commentId }, ctx, info) => {
      const { username } = checkAuth(ctx);
      const post = await Post.findById(postId);

      if (!post) {
        return "The post does not exist";
      }

      const commentIndex = post.comments.findIndex(
        (comment) => comment._id === commentId
      );
      
      if (commentIndex) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    },
  },
};
