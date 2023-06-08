// import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { SingUpInput } from './sign-up.input';

@InputType()
export class SignInInput  {
  @Field()
  email: string;

  @Field()
  password: string
}
