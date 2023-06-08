import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator'
@InputType()
export class SingUpInput {
  
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  lastName: string;


  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  passsword: string

}
