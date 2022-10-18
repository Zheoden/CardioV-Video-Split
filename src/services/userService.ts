import { UserRepository } from '../common/repositories';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user';

export default class UserService {
  public async getUserAsync(id: string): Promise<User> {
    const user = await UserRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) throw new Error('USER_NOT_FOUND');
    return user;
  }

  public async registerUserAsync(id: string): Promise<User> {
    await UserRepository.save({ id, createdAt: new Date().toISOString() });
    const newUser = this.getUserAsync(id);
    return newUser;
  }

  public async updateUserAsync(id: string, user: UserDto): Promise<User> {
    await UserRepository.save({ id, ...user });
    const updatedUser = this.getUserAsync(id);
    return updatedUser;
  }
}
