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

  @Query(() => [Task], { name: 'findAll' })
  findAll() {
    return this.tasksService.findAll()
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.findOne(id)
  }

  @Mutation(() => Task)
  updateTask(
    @Args('user_id', { type: () => String }) user_id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    return this.tasksService.update(user_id, updateTaskInput)
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.remove(id)
  }
}
