import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TasksService } from '../../application/services/tasks.service'
import { Task } from '../../domain/entities/task.entity'
import { CreateTaskInput } from '../../application/inputs/create-task.input'
import { UpdateTaskInput } from '../../application/inputs/update-task.input'

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task, { name: 'createTask' })
  createTask(
    @Args('createTaskInput', { type: () => CreateTaskInput })
    createTaskInput: CreateTaskInput,
  ) {
    return this.tasksService.create(createTaskInput)
  }

  @Query(() => [Task], { name: 'findAllTasks' })
  findAll() {
    return this.tasksService.findAll()
  }

  @Query(() => Task, { name: 'findTaskById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.findOne(id)
  }

  @Mutation(() => Task)
  updateTask(
    @Args('task_id', { type: () => String }) user_id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    return this.tasksService.update(user_id, updateTaskInput)
  }

  @Mutation(() => Boolean)
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.remove(id)
  }
}
