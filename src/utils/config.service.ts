import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private readonly config: ConfigService) {
    if (!config) {
      throw new Error('ConfigService must be initialized');
    }
  }

  databaseHost = () => this.config.getOrThrow<string>('DATABASE_HOST');
  databasePort = () =>
    parseInt(this.config.getOrThrow<string>('DATABASE_PORT'));
  databaseUsername = () => this.config.getOrThrow<string>('DATABASE_USERNAME');
  databasePassword = () => this.config.getOrThrow<string>('DATABASE_PASSWORD');
  databaseName = () => this.config.getOrThrow<string>('DATABASE_NAME');
  sessionSecret = () => this.config.getOrThrow<string>('SESSION_SECRET');
  jwtSecret = () => this.config.getOrThrow<string>('JWT_SECRET');
  databaseDisableSsl = () =>
    this.config.getOrThrow<string>('DATABASE_DISABLE_SSL');
}
