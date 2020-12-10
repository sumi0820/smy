const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import from Apollo server to handle user input error
const { UserInputError } = require("apollo-server");

// User Validation
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

// JWT Secret key
require("dotenv").config();

// Generate token
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      ctx,
      info
    ) {
      // User Input validation (from util)
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        // UserInputError is from apollo client
        throw new UserInputError("Something went wrong", { errors });
      }

      // User validation & Error handling
      const userInput = await User.findOne({ username });
      if (userInput) {
        // UserInputError is from apollo client
        throw new UserInputError("Username exists already", {
          errors: {
            username: "This username exists already",
          },
        });
      }

      // Hash password
      const salted = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash(password, salted);

      // User creation
      const user = await User.create({
        email,
        username,
        password: hashed,
      });

      // Generate token
      const token = generateToken(user);
      console.log(token);
      newUser = {
        ...user._doc,
        id: user._id,
        token,
      };

      console.log("New User registered:", newUser);
      return newUser;
    },

    async login(parent, { email, password }, ctx, info) {
      // User Input validation (from util)
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        // UserInputError is from apollo client
        throw new UserInputError("Something went wrong", { errors });
      }

      // Email check
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("Wrong credentials", { error });
      }

      // Password check
      const doesMatch = await bcrypt.compare(password, user.password);
      if (!doesMatch) {
        throw new UserInputError("Something went wrong", { errors });
      }

      // Generate token
      const token = generateToken(user);

      loginUser = {
        ...user._doc,
        id: user._id,
        token,
      };
      console.log("User login;", loginUser);
      return loginUser;
    },
  },
};
