import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql"
import { Status } from "@prisma/client"

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id: string

  @Field()
  title: string
  
  @Field()
  description: string
  
  @Field(() => Status)
  status: Status
}

registerEnumType(Status, {
  name: 'Status'
})
