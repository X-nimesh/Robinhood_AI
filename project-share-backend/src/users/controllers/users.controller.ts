import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { signupDto } from 'src/auth/auth.dto';
import { jwtGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // *signup contoller
  @Post('signup')
  async create(
    @Body()
    user: signupDto,
  ) {
    const userRes = await this.usersService.createUser(user);
    return {
      message: 'User created successfully',
      email: userRes.email,
      id: userRes.id,
      role: userRes.role,
    };
  }

  // *get all users controller
  @UseGuards(jwtGuard)
  @Get()
  async getAll() {
    return await this.usersService.getAllUsers();
  }
}
