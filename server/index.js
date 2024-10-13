//Imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv"); //For using process.env
const app = express();
const PORT = 8080;
const path = require("path")
const PostRouter = require("./Routes/PostsRoutes");
const GenerateImageRouter = require("./Routes/GenerateImageRoutes");
// const { GenerateImageRouter } = require("./Routes/GenerateImageRoutes");

//Configurations
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
mongoose.set('strictQuery', false);
const mongoURL = `mongodb+srv://Taransh121:${process.env.Mongo_DB_Password}@taransh7.lssoy.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Taransh7`;
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Database connected");
    }).catch((error) => {
        console.log(error);
    });

//Routes
app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

app.listen(PORT, () => {
    console.log(`Server running at PORT - ${PORT}`);
});