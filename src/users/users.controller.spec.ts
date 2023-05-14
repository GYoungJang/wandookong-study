import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('signup', () => {
    it('signup controller', async () => {
      const user = {
        email: 'test@test.com',
        nickname: 'test',
        password: 'test',
      };
      const signedUser = await service.signUp(user);
      expect(signedUser).toBe(201);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
