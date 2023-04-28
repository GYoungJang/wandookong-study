import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;

    const logger = new Logger(className);
    const req = context.switchToHttp().getRequest();

    logger.log(req.originalUrl, req.method);
    console.log('logging interceptor');
    return next.handle();
  }
}
