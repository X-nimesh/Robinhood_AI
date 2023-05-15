import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async findbyEmail(email: string): Promise<any> {
    return await this.userService.findOne(email);
  }
  async findOne(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    return null;
  }

  async login(user: any) {
    const userDet = await this.findOne(user.email, user.password);
    console.log(userDet);
    if (!userDet) {
      throw new NotFoundException({
        message: 'User not found',
        statusCode: 404,
      });
    }
    console.log(userDet);
    const payload = {
      email: userDet.email,
      sub: userDet.id,
      name: userDet.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
