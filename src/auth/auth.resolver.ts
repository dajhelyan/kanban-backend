import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SingUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { User } from 'src/user/model/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(@Args('singUpInput') singUpInput: SingUpInput): Promise<any> {
    return this.authService.signUp(singUpInput);
  }

  @Mutation(() => User)
  signIn(@Args('signInInput') signInInput: SignInInput): Promise<User> {
    return this.authService.signIn(signInInput)
  }

 }
