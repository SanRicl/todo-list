import { CreateUserInput } from '@application/inputs/create-user.input'
import { UpdateUserInput } from '@application/inputs/update-user.input'
import { User } from '@prisma/client'

export abstract class IUsersRepository {
  abstract create(data: CreateUserInput): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findOne(id: string): Promise<User | null>
  abstract update(id: string, data: UpdateUserInput): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
}
