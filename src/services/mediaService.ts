import { S3Service } from '../utils/S3Service.js';
import { v4 } from 'uuid';
import { MediaRepository } from '../common/repositories.js';
import { CDN_URL } from '../common/constants.js';
import { MediaCreateDto } from '../dtos/media-create.dto.js';
import { ProcessMediaFile } from '../utils/videoProcessService.js';
import { ParameterDto } from '../dtos/parameter.dto.js';
import { Media } from '../entities/media.js';
import { ParameterType } from '../common/interfaces.js';
import { MediaMediaDto } from '../dtos/media-media.dto.js';

const s3Service = new S3Service();

export default class MediaService {
  public async createMediaAsync(userId: string, mediaDto: MediaCreateDto, file: Express.Multer.File): Promise<void> {
    const filename = await this.processFile(file);

    const fileType = file.mimetype.match(/.*image.*/) ? 'i' : file.mimetype.match(/.*video.*/) ? 'v' : '';
    const parameters = await ProcessMediaFile(filename, fileType, mediaDto.scale);

    const mediaParameters: ParameterDto[] = [];
    const mediaMediaParameters: MediaMediaDto[] = [];

    for (const [key, value] of Object.entries(parameters)) {
      const currentKey = this.getEnumByString(key);
      if (currentKey) {
        value.forEach((number: number) => {
          if (Number(number) !== -1) {
            mediaParameters.push({
              field: currentKey,
              value: Number(number),
              unit: 'cm3',
            });
          }
        });
      } else {
        // this is the media file
        value.forEach((mediaArray: string[]) => {
          mediaMediaParameters.push({
            thumbnail: `${CDN_URL}/${mediaArray[0]}`,
            title: mediaArray[1],
          });
        });
      }
    }
    await MediaRepository.save({
      ...mediaDto,
      userId,
      thumbnail: `${CDN_URL}/${filename}`,
      parameters: mediaParameters,
      media: mediaMediaParameters,
    });
  }

  public async getMediaByIdAsync(userId: string, mediaId: string): Promise<Media> {
    const media = await MediaRepository.findOneOrFail({
      where: {
        id: mediaId,
        userId: userId,
      },
      relations: ['parameters', 'media'],
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

  private getEnumByString(cadena: string): ParameterType | undefined {
    switch (cadena) {
      case 'atrium_area':
        return ParameterType.ATRIUM_AREA;
      case 'muscle_thickness':
        return ParameterType.MUSCLE_THICKNESS;
      case 'ventricle_area':
        return ParameterType.VENTRICLE_AREA;
      case 'ventricle_volume':
        return ParameterType.VENTRICLE_VOLUME;
      default:
        return;
    }
  }
}
