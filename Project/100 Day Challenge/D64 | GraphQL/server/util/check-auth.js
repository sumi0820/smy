const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

require("dotenv").config();

module.exports = (context) => {
  // context = { ... headers }
//   console.log("THIS IS CONTEXT: ", context.req.headers.authorization);
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
