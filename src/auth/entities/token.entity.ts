import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  access_Token: String;
}
