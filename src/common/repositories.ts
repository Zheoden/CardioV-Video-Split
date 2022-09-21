import { Media } from "../entities/media";
import { Parameter } from "../entities/parameter";
import { User } from "../entities/user";
import { myDataSource } from "../ormConfig";

export const UserRepository = myDataSource.getRepository(User);
export const MediaRepository = myDataSource.getRepository(Media);
export const ParameterRepository = myDataSource.getRepository(Parameter);