import { CreateUserInput } from '@application/inputs/create-user.input'
import { UpdateUserInput } from '@application/inputs/update-user.input'
import { IUsersRepository } from '@infra/repositories/users-repository'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async create(data: CreateUserInput) {
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

  async update(id: string, data: UpdateUserInput) {
    const user = await this.usersRepository.update(id, data)

    return user
  }

  async findAll() {
    const users = await this.usersRepository.findAll()

    return users
  }

  async findOne(id: string) {
    const users = await this.usersRepository.findOne(id)

    return users
  }
}
