import { CreateUserInput } from '@application/inputs/create-user.input'
import { LoginUserInput } from '@application/inputs/login-user.input'
import { IUsersRepository } from '@infra/repositories/users-repository'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export default interface IResponse {
  name: string
  email: string
  access_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserInput): Promise<User> {
    const checkIfUserExists = await this.usersRepository.findByEmail(data.email)

    if (checkIfUserExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const { password } = data

    const hashedPassword = await hash(password, 8)

    const newUser = await this.usersRepository.create({
      email: data.email,
      last_name: data.last_name,
      name: data.name,
      password: hashedPassword,
    })

    return newUser
  }

  async login({ email, password }: LoginUserInput): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new HttpException('User does not exists', HttpStatus.CONFLICT)
    } else if (!user.password) {
      throw new HttpException(
        'Password must be provided',
        HttpStatus.BAD_REQUEST,
      )
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      )
    }

    const payload = { sub: user.id, username: user.name }

    return {
      name: user.name,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
