const Post = require("../../models/Post");
const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

// Validate if the token is still valid or not. If something wrong with the token, throw an error from check-auth.js
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    likePost: async (parent, { postId }, ctx, info) => {
      const { username } = checkAuth(ctx);

      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new UserInputError('Post does not exist')
        }
        if (post.likes.find((like) => like.username == username)) {
          // Unlike
          post.likes = post.likes.filter((like) => {
            return like.username !== username;
          });
        } else {
          // Like
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
