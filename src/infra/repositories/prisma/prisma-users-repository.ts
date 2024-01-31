import { CreateUserInput } from '@application/inputs/create-user.input'
import { IUsersRepository } from '../users-repository'
import { User } from '@prisma/client'
import { PrismaService } from '@infra/data/client/prisma.service'
import { UpdateUserInput } from '@application/inputs/update-user.input'
import { Injectable } from '@nestjs/common'

@Injectable()
export default class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserInput): Promise<User> {
    return await this.prisma.user.create({
      data,
      include: {
        tasks: true,
      },
    })
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        tasks: true,
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    })
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserInput,
      include: {
        tasks: true,
      },
    })
  }
}
