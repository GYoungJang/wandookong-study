import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(body: LogInDto) {
    const { email, password } = body;

    const user = await this.usersService.findEmail(email);
    const decodedPassword = await bcrypt.compare(password, user.password);

    if (user && decodedPassword) {
      const payload = { email, nickname: user.nickname };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else throw new UnauthorizedException('로그인 실패');
  }
}
