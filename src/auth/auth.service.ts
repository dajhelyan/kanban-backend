import { ForbiddenException, Injectable } from '@nestjs/common';
import { SingUpInput } from './dto/sign-up.input';
import { UpdateAuthInput } from './dto/update-auth.input';
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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
