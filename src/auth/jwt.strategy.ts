import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: './src/env/.env.dev' });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { email, nickname } = payload;
    const user: User = await this.userRepository.findOne({
      where: { email, nickname },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
