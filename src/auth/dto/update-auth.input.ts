// import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { SingUpInput } from './sign-up.input';

@InputType()
export class UpdateAuthInput extends PartialType(SingUpInput) {
  @Field(() => Int)
  id: number;
}
