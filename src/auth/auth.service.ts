import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SingUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import * as argon from 'argon2'
import { UserService } from 'src/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly userService: UserService
  ) {}

  async signUp(singUpInput: SingUpInput): Promise<User> {

    const hash = await argon.hash(singUpInput.passsword)

    try {
      const user = await this.userService.createUser({
        email: singUpInput.email,
        name: singUpInput.name,
        lastName: singUpInput.lastName,
        password: hash,
      });

      return user;

    } catch(error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException()
        }
      }

      throw error;
    }

  }

  async signIn(signInInput: SignInInput): Promise<any> {

    try { 
      const user = await this.userService.findUserByEmail(signInInput)

      const verifyPassword = argon.verify(
        user.password,
        signInInput.password
      )
        console.log(verifyPassword)
      if (verifyPassword) return user;

    } catch(error) {
      throw new ForbiddenException("Wrong credentials.")     
    }
  }
}