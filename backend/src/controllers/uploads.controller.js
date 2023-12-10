import { uploadImageToCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";

export const uploadImage = async (req, res) => {
  try {
    // Check if an image is included in the request
    if (!req.files?.image)
      return res
        .status(400)
        .json({ status: false, message: "No image uploaded" });

    // Upload the image to Cloudinary and obtain result data
    const result = await uploadImageToCloudinary(req.files.image.tempFilePath);

    // Log the Cloudinary result, with important fields like public_id (image ID) and secure_url (image URL)
    console.log(result);

    // In a real-world scenario, you might want to save relevant data from the Cloudinary result to your database
    // For example: const imageRecord = await saveImageDataToDatabase(result.public_id, result.secure_url);

    // This prevents images from being kept locally in the uploads folder
    await fs.unlink(req.files.image.tempFilePath);

    // Respond to the client indicating a successful image upload and image data
    res.status(200).json({
      status: true,
      message: "Image uploaded!",
      image: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (err) {
    // Log and respond with an error message if an exception occurs
    console.log(err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
