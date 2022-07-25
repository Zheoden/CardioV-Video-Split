import ffmpeg from 'ffmpeg';
import * as fs from 'fs/promises';
import { frameConfig } from '../config/videoConfig.js';
import { S3Service } from '../utils/S3Service.js';
import { v4 } from 'uuid';
import 'dotenv/config';

const CDN_URL = process.env.CDN_URL ?? '';
const s3Service = new S3Service();
export default class MediaService {
  processVideo = async file => {
    const fileName = v4();
    const returnValue = { video: '', files: [] };

    //Read the video from the FS
    const videoPath = `./assets/${file.fieldname}-${file.originalname}`
    returnValue.video = await this.#processFile(videoPath, fileName, file.mimetype, '.', false);
    const video = await new ffmpeg(videoPath);

    //Split video into frames
    const files = await video.fnExtractFrameToJPG('./frames', frameConfig);

    //Delete the video after images where gathered
    this.#deleteFileFromFS(videoPath);

    //upload all images to AWS
    const imagePromises = [];
    for (const file of files) {
      imagePromises.push(this.#processFile(file, fileName, 'image/jpeg', '_'));
    }

    //Wait for all images to upload
    returnValue.files = await Promise.all(imagePromises);

    return returnValue;
  };

  #deleteFileFromFS = async path => {
    await fs.unlink(path);
  };

  #processFile = async (filePath, baseFilename, fileMimetype, fileSeparator = '.', deleteFile = true) => {
    const listExt = filePath.split(fileSeparator);
    const ext = listExt[listExt.length - 1];
    const fileName = `${baseFilename}/${baseFilename}${fileSeparator}${ext}`;
    const data = await fs.readFile(filePath);
    await s3Service.uploadBuffer(data, fileName, fileMimetype);
    if (deleteFile) {
      this.#deleteFileFromFS(filePath);
    }

    return `${CDN_URL}/${fileName}`;
  };
}
