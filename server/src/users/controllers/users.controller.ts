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
    console.log(req.user);
    return {
      userId: req.user.userId,
      name: req.user.name,
      email: req.user.email,
    };
  }
  @Get('/user/:id')
  async getUser(@Req() req) {
    return await this.usersService.getUser(req.params.id);
  }
  @UseGuards(jwtGuard)
  @Get('/me')
  async getMe(@Req() req) {
    return await this.usersService.getUser(req.user.userId);
  }
}
