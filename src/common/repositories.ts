import { Media } from '../entities/media';
import { MediaMedia } from '../entities/mediaMedia';
import { MetricsView } from '../entities/mediaView';
import { Parameter } from '../entities/parameter';
import { User } from '../entities/user';
import { myDataSource } from '../ormConfig';

export const UserRepository = myDataSource.getRepository(User);
export const MediaRepository = myDataSource.getRepository(Media);
export const MediaMediaRepository = myDataSource.getRepository(MediaMedia);
export const ParameterRepository = myDataSource.getRepository(Parameter);
export const MetricsViewRepository = myDataSource.getRepository(MetricsView);
