import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/dist/env/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      retryAttempts: process.env.NODE_ENV === 'dev' ? 10 : 1,
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      timezone: 'local',
      socketPath: '/tmp/mysql.sock',

      //TODO: 둘의 차이 확인하기
      // TypeOrmModule.forRootAsync({
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   retryAttempts: configService.get('NODE_ENV') === 'dev' ? 10 : 1,
      //   type: 'mysql',
      //   host: configService.get('DB_HOST'),
      //   port: Number(configService.get('DB_PORT')),
      //   username: configService.get('DB_USERNAME'),
      //   password: configService.get('DB_PASSWORD'),
      //   database: configService.get('DB_DATABASE'),
      //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //   synchronize: process.env.NODE_ENV !== 'prod',
      //   logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      //   timezone: 'local',

      //})
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
