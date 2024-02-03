import { Module } from '@nestjs/common'
import { UsersModule } from './users.module'
import DataModule from './data.modules'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TasksModule } from './tasks.module'
import { AuthModule } from './auth.module'

@Module({
  imports: [
    DataModule,
    UsersModule,
    TasksModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
  ],
})
export class AppModule {}
