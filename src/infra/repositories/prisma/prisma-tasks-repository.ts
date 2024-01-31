import { Injectable } from '@nestjs/common'
import ITasksRepository from '../tasks-repository'
import { PrismaService } from '@infra/data/client/prisma.service'
import { CreateTaskInput } from '@application/inputs/create-task.input'
import { Task } from '@prisma/client'
import { UpdateTaskInput } from '@application/inputs/update-task.input'

@Injectable()
export default class TasksRepository implements ITasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskInput): Promise<Task> {
    return await this.prisma.task.create({
      data,
      include: {
        user: true,
      },
    })
  }

  async listAll(): Promise<Task[]> {
    return await this.prisma.task.findMany({
      include: {
        user: true,
      },
    })
  }

  async updateTask(id: string, data: UpdateTaskInput): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data,
      include: {
        user: true,
      },
    })
  }
  async findOne(id: string): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    })

    return true
  }
}
