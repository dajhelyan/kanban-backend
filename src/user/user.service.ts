import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {
  constructor( 
    private readonly prismaService: PrismaService 
  ) { }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({
      data: user
    })
  }

}