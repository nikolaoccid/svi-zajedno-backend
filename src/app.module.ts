import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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
import { ProjectUserModule } from './project-user/project-user.module';
import { ProjectUser } from './project-user/entities/project-user.entity';
import { QueryFailedErrorFilter } from './query-failed-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AxiosErrorFilter } from './axios-error.filter';
import { ProjectAssociateModule } from './project-associate/project-associate.module';
import { ProjectAssociate } from './project-associate/entities/project-associate.entity';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/entities/activity.entity';
import { StudentOnSchoolYearModule } from './student-on-school-year/student-on-school-year.module';
import { StudentOnSchoolYear } from './student-on-school-year/entities/student-on-school-year.entity';

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
    entities: [
      User,
      SchoolYear,
      Category,
      ProjectUser,
      ProjectAssociate,
      Activity,
      StudentOnSchoolYear,
    ],
    synchronize: true,
    ssl: config.databaseDisableSsl() != 'true',
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
  ],
  controllers: [],
  providers: [
    classSerializerInterceptorModule,
    genericErrorFilterModule,
    queryFieldFilterModule,
  ],
})
export class AppModule {}
