import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';

@Injectable()
export class Config {
  constructor(private readonly config: ConfigService) {
    if (!config) {
      throw new Error('ConfigService must be initialized');
    }
  }

  databaseHost = () =>
    process.env.DATABASE_HOST ?? this.config.get<string>('DATABASE_HOST');
  databasePort = () =>
    parseInt(
      process.env.DATABASE_PORT ?? this.config.get<string>('DATABASE_PORT'),
    );
  databaseUsername = () =>
    process.env.DATABASE_USERNAME ??
    this.config.get<string>('DATABASE_USERNAME');
  databasePassword = () =>
    process.env.DATABASE_PASSWORD ??
    this.config.get<string>('DATABASE_PASSWORD');
  databaseName = () =>
    process.env.DATABASE_NAME ?? this.config.get<string>('DATABASE_NAME');
  sessionSecret = () =>
    process.env.SESSION_SECRET ?? this.config.get<string>('SESSION_SECRET');
  jwtSecret = () =>
    process.env.JWT_SECRET ?? this.config.get<string>('JWT_SECRET');
  databaseDisableSsl = () =>
    process.env.DATABASE_DISABLE_SSL ??
    this.config.get<string>('DATABASE_DISABLE_SSL');
}
