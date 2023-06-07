import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql"
import { Status } from "@prisma/client"
import { IsNotEmpty, MaxLength } from "class-validator"

@InputType()
export class UpdateTaskInput {
  @IsNotEmpty()
  @Field(() => ID)
  id: string

  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  title: string
  
  @IsNotEmpty()
  @Field()
  description: string
  
  @Field(() => Status)
  status: Status
}

registerEnumType(Status, {
  name: 'Status'
})
