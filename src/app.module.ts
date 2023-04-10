import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from './utils/utils.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Config } from './utils/config.service';
import { CookieSessionModule } from 'nestjs-cookie-session';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SchoolYearModule } from './school-year/school-year.module';
import { SchoolYear } from './school-year/entities/school-year.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';

const cookieSessionModule = CookieSessionModule.forRootAsync({
  inject: [Config],
  useFactory(config: Config) {
    return {
      session: { secret: config.sessionSecret() },
    };
  },
});

const dbModule = TypeOrmModule.forRootAsync({
  useFactory: (config: Config) => ({
    type: 'postgres',
    host: config.databaseHost(),
    port: config.databasePort(),
    username: config.databaseUsername(),
    password: config.databasePassword(),
    database: config.databaseName(),
    entities: [User, SchoolYear, Category],
    synchronize: true,
    ssl: config.databaseDisableSsl() != 'true',
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [Config],
});

@Module({
  imports: [
    UtilsModule,
    dbModule,
    UsersModule,
    cookieSessionModule,
    AuthModule,
    SchoolYearModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
