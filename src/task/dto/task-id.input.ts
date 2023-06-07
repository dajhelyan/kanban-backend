import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql"

@InputType()
export class TaskId {
  @Field(type => ID)
  id: string
}