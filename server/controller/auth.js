import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcrypt";

// Signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("from line 25", email, password);
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    console.log("from line 33 ", user);
    const payload = {
      user: {
        userId: user._id, // Include the userId in the payload
      },
    };

    const token = jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: "1h" });
    console.log("from line 41", token);
    if (!token) {
      return;
    }
    res
      .cookie("token", token, { httpOnly: true })
      .send({ id: user._id, email: user.email, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// export const logout = async (req, res) => {
//   const token = req.header("Authorization").replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).send({ error: "Token is missing" });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findOne({ _id: decoded.user.userId, token: token });
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     user.token = null;
//     await user.save();
//     res.send({ message: "Successfully logged out" });
//   } catch (e) {
//     res.status(500).send({ error: "Internal server error" });
//   }
// };

// import jwt from 'jsonwebtoken';
// import User from '../model/User.js';

export const logout = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log('Token:', token);  // Log the token to see if it's received correctly

  if (!token) {
    return res.status(401).send({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);  // Log the decoded token

    const user = await User.findById(decoded.user.userId);  // Update to find by ID
    console.log('User:', user);  // Log the user to see if it's found

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Optionally, if you're not storing the token in the user model, you can skip setting it to null
    // user.token = null;  
    // await user.save();

    res.send({ message: "Successfully logged out" });
  } catch (e) {
    console.error('Error during logout:', e);  // Log the error
    res.status(500).send({ error: "Internal server error" });
  }
};
