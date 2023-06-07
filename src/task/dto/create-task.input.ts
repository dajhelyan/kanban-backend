import { Field, InputType, registerEnumType } from "@nestjs/graphql"
import { Status } from "@prisma/client"

@InputType()
export class CreateTaskInput {
  @Field()
  title!: string

  @Field()
  description!: string
  
  @Field(() => Status)
  status: Status
}

registerEnumType(Status, {
  name: 'Status'
})
