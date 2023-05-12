import { User } from './../../users/entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class LogInDto extends PickType(User, ['email', 'password'] as const) {}
