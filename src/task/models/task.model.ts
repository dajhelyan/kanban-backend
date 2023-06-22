import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Status)
  status: Status

  @Field({ nullable: false })
  userId: string
}

registerEnumType(Status, {
  name: 'Status'
})