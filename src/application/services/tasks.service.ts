import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTaskInput } from '../inputs/create-task.input'
import { UpdateTaskInput } from '../inputs/update-task.input'
import ITasksRepository from '@infra/repositories/tasks-repository'

@Injectable()
export class TasksService {
  constructor(private tasksRepository: ITasksRepository) {}

  async create(data: CreateTaskInput) {
    return await this.tasksRepository.create(data)
  }

  async findAll() {
    return await this.tasksRepository.listAll()
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne(id)

    if (!task) {
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND)
    }
    return task
  }

  async update(id: string, data: UpdateTaskInput) {
    const taskUpdated = await this.tasksRepository.updateTask(id, data)
    return taskUpdated
  }

  async remove(id: string) {
    return await this.tasksRepository.remove(id)
  }
}
