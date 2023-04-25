import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { signupDto } from 'src/auth/auth.dto';
import { jwtGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('User')
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
  @UseGuards(jwtGuard)
  @Get('/token')
  async checkToken(@Req() req) {
    return { userId: req.user.userId, message: 'Token is valid' };
  }
  @Get('/user/:id')
  async getUser(@Req() req) {
    return await this.usersService.getUser(req.params.id);
  }
}
