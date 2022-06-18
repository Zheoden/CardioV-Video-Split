import { Router } from "express";
import multer from "multer";
import MediaService from "./../services/mediaService.js"

const mediaService = new MediaService();
const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./assets");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + file.originalname);
    },
  });
  //const storage = multer.memoryStorage();
  
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  try {
    const returnValue = await mediaService.processVideo(file);
    return res.status(200).json(returnValue);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error, nada salio flama :(" });
  }
});

export default router;
