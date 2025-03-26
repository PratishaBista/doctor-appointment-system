// API for adding doctor
import validator from "validator";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // console.log(
    //   {
    //     name,
    //     email,
    //     password,
    //     speciality,
    //     degree,
    //     experience,
    //     about,
    //     fees,
    //     address,
    //   },
    //   imageFile
    // );

    // checking for all data to add the doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
      // !imageFile
    ) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // validation for email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validation for password (length and special characters needed)
    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain special characters",
      });
    }

    // hashing the password
    const saltRounds = 10;
    const salt = await bycrypt.genSalt(saltRounds);
    const hashedPassword = await bycrypt.hash(password, salt);

    //upload image to cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctors",
      width: 150,
      height: 150,
      crop: "fill",
    });
    const imageURL = result.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageURL,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), //store the address as an object in the database
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.log("Error in addDoctor: ", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) { const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({ success: true, message: "Admin logged in", token });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin };
