import { Body, Controller, Post } from '@nestjs/common';
import { loginDto } from '../auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() user: loginDto) {
    return this.authService.login(user);
  }
}
