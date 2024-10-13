import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:8080/api/"
});
export const GetPosts = async () => { await API.get("/post/getAllPosts") };
export const CreatePost = async (data) => { await API.post("/post/create", data) };
export const GenerateImage = async (data) => { await API.post("/generateImage", data) };