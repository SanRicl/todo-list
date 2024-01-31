import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from '../../application/services/users.service'

import User from '@domain/entities/user.entity'

import { CreateUserInput } from '../../application/inputs/create-user.input'
import { UpdateUserInput } from '../../application/inputs/update-user.input'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  createUser(
    @Args('data') { email, last_name, name, password }: CreateUserInput,
  ) {
    const userCreated = this.usersService.create({
      email,
      last_name,
      name,
      password,
    })

    return userCreated
  }

  @Query(() => [User], { name: 'findAll' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'findOne' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.findOne(id)
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('user_id') user_id: string,
  ) {
    return this.usersService.update(user_id, updateUserInput)
  }
}
