import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [TaskService]
})
export class TaskModule {}
