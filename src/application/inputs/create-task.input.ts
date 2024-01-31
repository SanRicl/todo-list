import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  text: string

  @Field(() => String)
  user_id: string

  @Field(() => Boolean, { defaultValue: true })
  active: boolean
}
