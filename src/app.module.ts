import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TaskResolver } from './task/task.resolver';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthResolver } from './auth/auth.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TaskModule,
    PrismaModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TaskService,
    TaskResolver,
    UserService,
    UserResolver,
    AuthService,
    AuthResolver
  ],
})
export class AppModule {}
