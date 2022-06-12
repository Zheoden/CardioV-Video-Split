import express from "express";
import multer from "multer";
import ffmpeg from "ffmpeg";
import "dotenv/config";

const port = process.env.PORT ?? 3000;
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  try {
    var process = new ffmpeg(`./assets/${file.fieldname}-${file.originalname}`);
    await process.then(
      function (video) {
        // Callback mode
        video.fnExtractFrameToJPG(
          "./frames",
          {
            frame_rate: 1,
            number: 50,
            keep_pixel_aspect_ratio: true,
            keep_aspect_ratio: true,
            file_name: "my_frame_%t_%s",
          },
          (error, files) => {
            console.log(error);
            console.log(files);
            if (!error) console.log("Frames: " + files);
          }
        );
      },
      function (err) {
        console.log("Error: " + err);
      }
    );
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ message: "Salio todo flama!" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
