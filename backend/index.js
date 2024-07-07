const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Set up nodemailer transporter (replace with your email provider's credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.User_Email,
    pass: process.env.User_Password,
  },
});

// SignUp route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//=================================================================//
// SignIn route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set the token expiration time
    });

    // Include user _id in the response
    res.status(200).json({ name: user.name, token, message: 'Login successful' });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
//===============================================================

// Check email route
app.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({ exists: true , userId: user._id});
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//============================================================

// Forgot Password route
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Generate a random OTP
    const otp = crypto.randomBytes(3).toString("hex");
    console.log(otp);

    // Set the OTP and expiration time in the database
    user.resetPasswordOTP = otp;
    user.resetPasswordExpiration = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    // Send the OTP to the user's email
    const mailOptions = {
      from: "codies404@gmail.com",
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP for resetting the password is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//====================================================================

// Check OTP route
app.post("/check-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the OTP is expired
    if (Date.now() > user.resetPasswordExpiration) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // Check if the provided OTP matches the stored OTP
    if (otp !== user.resetPasswordOTP) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear the OTP fields in the database
    user.resetPasswordOTP = null;
    user.resetPasswordExpiration = null;
    await user.save();

    res.status(200).json({ message: "OTP verification successful" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//=====================================================================

// Reset Password route
app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Hash and update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // Clear the OTP field
    user.resetPasswordOTP = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//===============================================================================
// Get User By ID
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
//=================================================================================

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Node API is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
