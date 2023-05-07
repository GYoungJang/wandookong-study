import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async checkEmail(email: string): Promise<boolean> {
    const result = await this.repository.findOne({ where: { email } });
    if (result) return true;
    else return false;
  }

  async createEntity(user: CreateUserDto): Promise<User> {
    return await this.repository.create(user);
  }

  async findEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }
}
