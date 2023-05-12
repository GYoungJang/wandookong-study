import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  logIn(@Body() body: LogInDto) {
    return this.authService.logIn(body);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req :', req);
  }
}
