import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService
  ) { }

  @Get() 
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post('create')
  AddTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.addTask(createTaskDto);
  }
}
