import { CreateUserInput } from '@application/inputs/create-user.input'
import { UpdateUserInput } from '@application/inputs/update-user.input'
import { IUsersRepository } from '@infra/repositories/users-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async create(data: CreateUserInput) {
    const user = await this.usersRepository.create(data)

    return user
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
