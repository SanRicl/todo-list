import { Module } from '@nestjs/common'
import { UsersResolver } from '../../presenters/resolvers/users.resolver'
import { UsersService } from '@application/services/users.service'
import { IUsersRepository } from '@infra/repositories/users-repository'
import UsersRepository from '@infra/repositories/prisma/prisma-users-repository'

@Module({
  providers: [
    UsersResolver,
    UsersService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
