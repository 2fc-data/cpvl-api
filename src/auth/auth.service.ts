import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findUser({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { id, username, role } = user;
      return { id, username, role };
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: { id: user.id, role: user.role },
    };
    return this.jwtService.sign(payload);
  }
}
