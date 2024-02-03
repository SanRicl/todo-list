import { CreateUserInput } from '@application/inputs/create-user.input'
import { LoginUserInput } from '@application/inputs/login-user.input'
import IResponse, { AuthService } from '@application/services/auth.service'
import ILoginResponse from '@application/utils/login-response'
import User from '@domain/entities/user.entity'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User as UserP } from '@prisma/client'

@Resolver()
export class AuthResolver {
  constructor(private readonly authResolver: AuthService) {}

  @Mutation(() => User)
  async register(@Args('data') data: CreateUserInput): Promise<UserP> {
    const user = await this.authResolver.register(data)

    return user
  }

  @Mutation(() => ILoginResponse)
  async login(@Args('data') data: LoginUserInput): Promise<IResponse> {
    const { access_token, email, name } = await this.authResolver.login(data)

    return {
      access_token,
      email,
      name,
    }
  }
}
