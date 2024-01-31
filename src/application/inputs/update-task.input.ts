import { CreateTaskInput } from './create-task.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  text: string

  @Field(() => Boolean, { defaultValue: true })
  boolean: boolean
}
