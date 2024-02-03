import { Module } from '@nestjs/common'
import { AuthService } from '../../application/services/auth.service'
import { IUsersRepository } from '@infra/repositories/users-repository'
import UsersRepository from '@infra/repositories/prisma/prisma-users-repository'
import { AuthResolver } from 'src/presenters/resolvers/auth.resolver'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class AuthModule {}
