import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SingUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import * as argon from 'argon2'
import { UserService } from 'src/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { Token } from './entities/token.entity';


@Injectable()
export class AuthService {
  
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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

  async signIn(signInInput: SignInInput): Promise<Token> {

    try { 
      const user = await this.userService.findUserByEmail(signInInput)

      const verifyPassword = argon.verify(
        user.password,
        signInInput.password
      )

      if (verifyPassword) {

        const payload = {
          subject: user.id,
          email: user.email
        }

        // jwt token generated
        const token =  {
          access_Token: await this.jwtService.sign(payload)
        }
        return token;
      };

    } catch(error) {
      console.log(error)
      throw new ForbiddenException("Wrong credentials.")     
    }
  }
}