import { S3Service } from '../utils/S3Service.js';
import { v4 } from 'uuid';
import { MediaRepository } from '../common/repositories.js';
import { CDN_URL } from '../common/constants.js';
import { MediaCreateDto } from '../dtos/media-create.dto.js';
import { ProcessMediaFile } from '../utils/videoProcessService.js';
import { ParameterDto } from '../dtos/parameter.dto.js';
import { Media } from '../entities/media.js';

const s3Service = new S3Service();

export default class MediaService {
  public async createMediaAsync(userId: string, mediaDto: MediaCreateDto, file: Express.Multer.File): Promise<void> {
    const filename = await this.processFile(file);
    const fileType = file.mimetype.match(/.*image.*/) ? 'i' : file.mimetype.match(/.*video.*/) ? 'v' : '';
    const parameters = await ProcessMediaFile(filename, fileType);
    const mediaParameters: ParameterDto[] = [];
    for (const [key, value] of Object.entries(parameters)) {
      if (Number(value) !== -1) {
        mediaParameters.push({
          field: key,
          value: value,
          unit: 'cm3',
          createdAt: new Date().toISOString(),
        });
      }
    }
    await MediaRepository.save({
      ...mediaDto,
      userId,
      thumbnail: `${CDN_URL}/${filename}`,
      createdAt: new Date().toISOString(),
      parameters: mediaParameters,
    });
  }

  public async getMediaByIdAsync(userId: string, mediaId: string): Promise<Media> {
    const media = await MediaRepository.findOneOrFail({
      where: {
        id: mediaId,
        userId: userId,
      },
      relations: ['parameters'],
    });
    return media;
  }

  public async getAllMediaByUserAsync(userId: string): Promise<Media[]> {
    const allMedia = await MediaRepository.find({
      where: {
        userId: userId,
      },
    });
    return allMedia;
  }

  public async deleteMediaByIdAsync(userId: string, mediaId: string): Promise<void> {
    await MediaRepository.softDelete({
      userId: userId,
      id: mediaId,
    });
    return;
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
