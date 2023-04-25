import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../models/users.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
  ) {}

  async createUser(user: {
    email: string;
    name: string;
    password: string;
    role: string;
  }) {
    console.log('user', user);
    const password = await bcrypt.hash(user.password, 10);
    const userDet = {
      email: user.email,
      name: user.name,
      password: password,
      role: user.role,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const userRes = this.userRepo.save(userDet);
    return userRes;
  }
  async getAllUsers() {
    return this.userRepo.find();
  }
  async findOne(email: string): Promise<any> {
    return this.userRepo.findOne({ where: { email } });
  }
  async getUser(id: string) {
    return this.userRepo.findOne({ where: { id: parseInt(id) } });
  }
}
