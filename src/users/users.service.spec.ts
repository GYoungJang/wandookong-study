import { boolean } from 'yargs';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });
});
