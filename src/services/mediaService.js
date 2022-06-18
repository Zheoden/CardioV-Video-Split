import ffmpeg from 'ffmpeg';
import * as fs from 'fs/promises';
import { frameConfig } from '../config/videoConfig.js';
import { S3Service } from '../utils/S3Service.js';
import { v4 } from 'uuid';

const s3Service = new S3Service();
export default class MediaService {
  processVideo = async file => {
    const fileName = v4();
    const returnValue = { video: '', files: [] };

    //read the video from the FS
    returnValue.video = await this.#processFile(`./assets/${file.fieldname}-${file.originalname}`, fileName, file.mimeType, '.');
    const video = await new ffmpeg(`./assets/${file.fieldname}-${file.originalname}`);

    const files = await video.fnExtractFrameToJPG('./frames', frameConfig);
    const imagePromises = [];
    for (const file of files) {
        imagePromises.push(this.#processFile(file, fileName, file.mimeType, '_'));
    }

    returnValue.files = await Promise.all(imagePromises);

    return returnValue;
  };

  #deleteFileFromFS = async path => {
    await fs.unlink(path);
  };

  #processFile = async (filePath, baseFilename, fileMimetype, fileSeparator = '.') => {
    const listExt = filePath.split(fileSeparator);
    const ext = listExt[listExt.length - 1];
    const fileName = `${baseFilename}/${baseFilename}${fileSeparator}${ext}`;
    const data = await fs.readFile(filePath);
    await s3Service.uploadBuffer(data, fileName, fileMimetype);
    //this.#deleteFileFromFS(filePath);

    return fileName;
  };
}
