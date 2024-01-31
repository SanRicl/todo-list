import { DateScalarMode, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  last_name: string

  @Field(() => String)
  password: string

  @Field(() => Date)
  created_at: DateScalarMode

  @Field(() => Date)
  updated_at: DateScalarMode
}
