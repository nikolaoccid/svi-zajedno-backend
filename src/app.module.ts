import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieSessionModule } from 'nestjs-cookie-session';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/entities/activity.entity';
import { AdminRoleMiddleware } from './admin-role.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/jwt.middleware';
import { AxiosErrorFilter } from './axios-error.filter';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';
import { ExportModule } from './export/export.module';
import { ProjectAssociate } from './project-associate/entities/project-associate.entity';
import { ProjectAssociateModule } from './project-associate/project-associate.module';
import { ProjectUser } from './project-user/entities/project-user.entity';
import { ProjectUserModule } from './project-user/project-user.module';
import { QueryFailedErrorFilter } from './query-failed-error.filter';
import { SchoolYear } from './school-year/entities/school-year.entity';
import { SchoolYearModule } from './school-year/school-year.module';
import { StatisticsModule } from './statistics/statistics.module';
import { StudentOnActivity } from './student-on-activity/entities/student-on-activity.entity';
import { StudentOnActivityModule } from './student-on-activity/student-on-activity.module';
import { StudentOnSchoolYear } from './student-on-school-year/entities/student-on-school-year.entity';
import { StudentOnSchoolYearModule } from './student-on-school-year/student-on-school-year.module';
import { RequestEntity } from './user-request/entities/request.entity';
import { UserRequest } from './user-request/entities/user-request.entity';
import { UserRequestModule } from './user-request/user-request.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Config } from './utils/config.service';
import { UtilsModule } from './utils/utils.module';

const cookieSessionModule = CookieSessionModule.forRootAsync({
  inject: [Config],
  useFactory(config: Config) {
    return {
      session: { secret: config.sessionSecret() },
    };
  },
});

export const dbModule = TypeOrmModule.forRootAsync({
  useFactory: (config: Config) => ({
    type: 'postgres',
    host: config.databaseHost(),
    port: config.databasePort(),
    username: config.databaseUsername(),
    password: config.databasePassword(),
    database: config.databaseName(),
    entities: [
      User,
      SchoolYear,
      Category,
      ProjectUser,
      ProjectAssociate,
      Activity,
      StudentOnSchoolYear,
      StudentOnActivity,
      Contact,
      RequestEntity,
      UserRequest,
    ],
    migrationsTableName: 'migrations',
    migrations: ['dist/migrations/*.{ts,js}'],
    synchronize: true,
    logging: false,
    ssl: config.databaseDisableSsl() != 'true',
    cli: {
      migrationsDir: `/migrations`,
    },
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [Config],
});

const queryFieldFilterModule = {
  provide: APP_FILTER,
  useClass: QueryFailedErrorFilter,
};

const genericErrorFilterModule = {
  provide: APP_FILTER,
  useClass: AxiosErrorFilter,
};

const classSerializerInterceptorModule = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};

@Module({
  imports: [
    UtilsModule,
    dbModule,
    UsersModule,
    cookieSessionModule,
    AuthModule,
    SchoolYearModule,
    CategoryModule,
    ProjectUserModule,
    ProjectAssociateModule,
    ActivityModule,
    StudentOnSchoolYearModule,
    StudentOnActivityModule,
    StatisticsModule,
    ExportModule,
    ContactModule,
    UserRequestModule,
  ],
  controllers: [],
  providers: [
    classSerializerInterceptorModule,
    genericErrorFilterModule,
    queryFieldFilterModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        { path: 'users/(.*)', method: RequestMethod.POST },
      )
      .forRoutes('*');

    consumer
      .apply(AdminRoleMiddleware)
      .exclude(
        { path: '/auth/(.*)/(.*)', method: RequestMethod.ALL },
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/me', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
