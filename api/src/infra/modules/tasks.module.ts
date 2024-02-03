import { Module } from '@nestjs/common'
import { TasksService } from '../../application/services/tasks.service'
import { TasksResolver } from '../../presenters/resolvers/tasks.resolver'
import ITasksRepository from '@infra/repositories/tasks-repository'
import TasksRepository from '@infra/repositories/prisma/prisma-tasks-repository'

@Module({
  providers: [
    TasksResolver,
    TasksService,
    {
      provide: ITasksRepository,
      useClass: TasksRepository,
    },
  ],
})
export class TasksModule {}
