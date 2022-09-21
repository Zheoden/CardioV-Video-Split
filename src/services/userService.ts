import { User } from "aws-sdk/clients/appstream";
import { UserDto } from "../dtos/user.dto";

export default class UserService {
  public async getUser(id: string): Promise<User> {
    return {} as User;
  }

  public async register(id: string): Promise<User> {
    return {} as User;
  }

  public async updateProfile(user: UserDto): Promise<User> {
    return {} as User;
  }
}
