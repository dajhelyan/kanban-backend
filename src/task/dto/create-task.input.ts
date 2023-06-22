import { Field, InputType, registerEnumType } from "@nestjs/graphql"
import { Status } from "@prisma/client"
import { IsNotEmpty, MaxLength } from "class-validator"

@InputType()
export class CreateTaskInput {
  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  title: string
  
  @IsNotEmpty()
  @MaxLength(400)
  @Field()
  description?: string

  @Field(() => Status)
  status: Status
  
  @IsNotEmpty()
  @Field({nullable: false})
  userId: string
}

registerEnumType(Status, {
  name: 'Status'
})
