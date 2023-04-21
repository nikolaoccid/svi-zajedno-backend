import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Config } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `./envs/.env.${process.env.ENV_NAME ?? 'local'}`],
    }),
  ],
  providers: [Config],
  exports: [Config],
})
export class UtilsModule {}
