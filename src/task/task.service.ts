import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto';
import { randomUUID } from 'crypto';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async getAllTasks(): Promise<Task[]> {
    return await this.prismaService.task.findMany()
  }

  async addTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return await this.prismaService.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status
      }
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
}
