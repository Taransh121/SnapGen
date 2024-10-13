const axios = require("axios");
const FormData = require("form-data"); // Import the form-data library
const fs = require("fs"); // If you still want to save files, keep this

// Function to generate an image using Stability AI
exports.generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body; // Assuming you are sending the prompt in the request body

        // Prepare the payload for the Stability AI API
        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("output_format", "webp"); // You can adjust the output format as needed

        // Make the POST request to Stability AI API
        const response = await axios.post(
            `https://api.stability.ai/v2beta/stable-image/generate/ultra`, // Make sure the endpoint is correct
            formData,
            {
                validateStatus: undefined,
                responseType: "arraybuffer", // Response will be an image in arraybuffer
                headers: {
                    ...formData.getHeaders(), // Add FormData headers
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, // Use environment variable for API key
                    Accept: "image/*"
                },
            }
        );

        // Check the response status and handle accordingly
        if (response.status === 200) {
            // Convert the image buffer to a Base64 string
            const base64Image = Buffer.from(response.data).toString('base64');

            // Return the base64 image in the response
            return res.status(200).json({
                success: true,
                photo: base64Image // This sends the Base64 image to the frontend
            });
        } else {
            throw new Error(`${response.status}: ${response.data.toString()}`);
        }
    } catch (error) {
        console.error("Error generating image:", error.response ? error.response.data : error.message);
        next(error); // Pass the error to the next middleware
    }
};
