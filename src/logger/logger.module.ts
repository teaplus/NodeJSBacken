import { Global, Module } from '@nestjs/common';
import { LoggerService } from './custom.logger';
import { RedirectError } from './redirecError.middleware';

@Global()
@Module({
  providers: [LoggerService, RedirectError],
  exports: [LoggerService, RedirectError],
})
export class LoggerModule {}
