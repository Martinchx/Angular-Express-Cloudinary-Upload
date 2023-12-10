import { Router } from "express";
import fileUpload from "express-fileupload";

import { uploadImage } from "../controllers/uploads.controller.js";

const router = Router();

// We put here the fileUpload config bc its the only route which will upload an image, if we put it like a middleware in app.js, in all routes it will upload files in '/uploads' folder
router.post(
  "/uploads/upload-image",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  uploadImage
);

export default router;
