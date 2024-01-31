import { ObjectType, Field, ID, DateScalarMode } from '@nestjs/graphql'
import { User as UserP } from '@prisma/client'
import User from './user.entity'

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string

  @Field(() => String)
  text: string

  @Field(() => String)
  user_id: string

  @Field(() => Boolean, { defaultValue: true })
  boolean: boolean

  @Field(() => Date)
  created_at: DateScalarMode

  @Field(() => Date)
  updated_at: DateScalarMode

  @Field(() => User)
  user: UserP
}
