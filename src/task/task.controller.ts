import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  addTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.addTask(createTaskDto);
  }

  @Patch('update/:id') 
  updateTask(@Param('id') id: string,
  @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.updateTask({
      where: {id},
      data: updateTaskDto
    })
  }
}
