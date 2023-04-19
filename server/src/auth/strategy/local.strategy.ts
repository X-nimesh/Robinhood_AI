import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(username: string, password: string) {
    const user = await this.authservice.findbyEmail(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
