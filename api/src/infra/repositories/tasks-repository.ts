import { CreateTaskInput } from '@application/inputs/create-task.input'
import { UpdateTaskInput } from '@application/inputs/update-task.input'
import { Task } from '@prisma/client'

export default abstract class ITasksRepository {
  abstract create(data: CreateTaskInput): Promise<Task>
  abstract listAll(): Promise<Task[]>
  abstract updateTask(id: string, task: UpdateTaskInput): Promise<Task>
  abstract findOne(id: string): Promise<Task | null>
  abstract remove(id: string): Promise<boolean>
}
