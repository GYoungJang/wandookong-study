import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/users', () => {
    it('/signup (POST)', () => {
      return request(app.getHttpServer())
        .post('/users/signup')
        .send({
          email: 'test3@gmail.com',
          nickname: 'test3',
          password: 'test3',
        })
        .expect(201);
    });
  });

  describe('auth', () => {
    it('/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test3@gmail.com',
          password: 'test3',
        })
        .expect(201);
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
