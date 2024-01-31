import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  last_name: string

  @Field(() => String)
  password: string
}
