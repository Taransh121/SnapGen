const Post = require("../Models/PostsModel");
const dotenv = require("dotenv");
// const { createError } = require("../error");
const cloudinary = require("cloudinary").v2;
dotenv.config();

cloudinary.config({
    cloud_name: `${process.env.cloud_name}`,
    api_key: `${process.env.api_key}`,
    api_secret: `${process.env.api_secret}`
});
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        // next(createError(error.status, error?.response?.data?.error?.message || error.message));
        next(error);
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoResponse = await cloudinary.uploader.upload(photo);
        const photoURL = photoResponse.secure_url;
        const newPost = await Post.create({ name, prompt, photo: photoURL });
        return res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        // next(createError(error.status, error?.response?.data?.error?.message || error.message));
        next(error);
    }
}