import UserModel from "../models/user.js";
import VideoModel from "../models/video.js"; // Adjust the import to match your actual VideoModel import
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('video'); // Use .single() middleware for single file upload

class UserController {
  static userRegistration = async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;
    try {
      if (fname && email && password && mobile && cpassword) {
        if (password === cpassword) {
          const user = await UserModel.findOne({ email: email });
          if (user) {
            return res.status(400).send({ status: "failed", message: "Email already exists" });
          }

          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            fname: fname,
            email: email,
            mobile: mobile,
            password: hashPassword,
          });
          await doc.save();
          const savedUser = await UserModel.findOne({ email: email });

          const token = jwt.sign(
            { userId: savedUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              maxAge: 5 * 24 * 60 * 60, // 5 days in seconds
            })
          );

          res.status(200).send({ status: "success", message: "Registration Success" });
        } else {
          res.status(400).send({ status: "failed", message: "Password doesn't match" });
        }
      } else {
        res.status(400).send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "failed", message: "Unable to register" });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return res.status(400).send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              maxAge: 5 * 24 * 60 * 60, // 5 days in seconds
            })
          );

          res.status(200).send({ status: "success", message: "Login Success" });
        } else {
          res.status(400).send({
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.status(400).send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "failed", message: "Unable to Login" });
    }
  };

  static uservideo = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          console.error('Error uploading video:', err);
          return res.status(500).json({ error: 'Failed to upload video' });
        }
        
        if (!req.file) {
          return res.status(400).json({ error: 'No video file provided' });
        }

        const newVideo = new VideoModel({
          title: req.body.title,
          description: req.body.description,
          videoUrl: req.file.path, // Path to the uploaded video file
        });

        await newVideo.save();

        res.status(201).json({ message: 'Video uploaded successfully' });
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: 'Failed to upload video' });
    }
  }
}

export default UserController;
