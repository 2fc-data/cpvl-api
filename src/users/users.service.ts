import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async allUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findUser({
    username,
  }: {
    username: string;
  }): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }
}
