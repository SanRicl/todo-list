import { Module } from '@nestjs/common'
import { UsersModule } from './users.module'
import DataModule from './data.modules'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TasksModule } from './tasks.module'
@Module({
  imports: [
    DataModule,
    UsersModule,
    TasksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
