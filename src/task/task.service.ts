import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async getAllTasks(): Promise<Task[]> {
    return await this.prismaService.task.findMany()
  }

  async findOneTask(id: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return await this.prismaService.task.findUnique({
      where: id
    })
  }

  async addTask(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    return await this.prismaService.task.create({
      data
    })
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    return await this.prismaService.task.update({
      data,
      where,
    })
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return await this.prismaService.task.delete({
      where,
    })
  }
}
