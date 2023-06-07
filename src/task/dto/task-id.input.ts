import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class TaskId {
  @IsNotEmpty()
  @Field(type => ID)
  id: string
}