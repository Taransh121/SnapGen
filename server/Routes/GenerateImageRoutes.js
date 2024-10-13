const express = require("express");
const router = express.Router();
const { generateImage } = require("../Controllers/GenerateImageController");

router.post("/", generateImage);

module.exports = router;

