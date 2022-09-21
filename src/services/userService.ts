import { UserRepository } from '../common/repositories';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user';

export default class UserService {
  public async getUserAsync(id: string): Promise<User> {
    const user = await UserRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return user;
  }

  public async registerUserAsync(id: string): Promise<User> {
    await UserRepository.save({ id, createdAt: new Date().toISOString() });
    const newUser = this.getUserAsync(id);
    return newUser;
  }

  public async updateUserAsync(user: UserDto): Promise<User> {
    return {} as User;
  }
}
