import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class ILoginResponse {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  access_token: string
}
