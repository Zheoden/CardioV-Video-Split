import { S3Service } from '../utils/S3Service.js';
import { v4 } from 'uuid';
import 'dotenv/config';

const s3Service = new S3Service();

export default class MediaService {
  public async processFile(file?: Express.Multer.File): Promise<string> {
    if (file) {
      const baseFileName = v4();
      const listExt = file.originalname.split('.');
      const ext = listExt[listExt.length - 1];
      const fileName = `${baseFileName}.${ext}`;


      await s3Service.uploadBuffer(file.buffer, fileName, file.mimetype);

      return fileName;
    } else {
      throw 'Missing file';
    }
  }
}
