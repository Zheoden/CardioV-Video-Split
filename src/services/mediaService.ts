import { S3Service } from '../utils/S3Service.js';
import { v4 } from 'uuid';
import 'dotenv/config';
import { MediaRepository } from '../common/repositories.js';
import { CDN_URL } from '../common/constants.js';
import { MediaCreateDto } from '../dtos/media-create.dto.js';

const s3Service = new S3Service();

export default class MediaService {
  public async createMediaAsync(userId: string, mediaDto: MediaCreateDto, file: Express.Multer.File): Promise<void> {
    const filename = await this.processFile(file);
    await MediaRepository.save({ ...mediaDto, userId, thumbnail: `${CDN_URL}/${filename}`, createdAt: new Date().toISOString() });
  }

  public async processFile(file: Express.Multer.File): Promise<string> {
    const baseFileName = v4();
    const listExt = file.originalname.split('.');
    const ext = listExt[listExt.length - 1];
    const fileName = `${baseFileName}.${ext}`;

    await s3Service.uploadBuffer(file.buffer, fileName, file.mimetype);

    return fileName;
  }
}
