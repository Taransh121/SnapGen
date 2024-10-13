const express = require("express");
const router = express.Router();
const { createPost, getAllPosts } = require("../Controllers/PostsController");

router.get("/getAllPosts", getAllPosts);
router.post("/create", createPost);

module.exports = router;

