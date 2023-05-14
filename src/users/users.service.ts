import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async signUp(body: CreateUserDto) {
    const { email, password, nickname } = body;
    const isUserExist = await this.usersRepository.checkEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('이미 가입되어 있습니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createEntity({
      email,
      password: hashedPassword,
      nickname,
    });

    await this.usersRepository.save(user);

    return new ResponseUserDto(user);
  }

  async findEmail(email: string) {
    return await this.usersRepository.findEmail(email);
  }
}
