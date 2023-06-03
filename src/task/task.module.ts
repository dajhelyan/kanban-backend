import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskController } from './task.controller';

@Module({
  imports: [PrismaModule],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
