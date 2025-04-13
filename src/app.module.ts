import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import {APP_GUARD} from "@nestjs/core";
import {GqlAuthGuard} from "./auth/gql-auth.guard";
import {AuthModule} from "./auth/auth.module";
import {AppConfigModule} from "./config/config.module";

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: GqlAuthGuard
  }],
})
export class AppModule {}
