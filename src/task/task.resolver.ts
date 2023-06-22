import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { Task } from "./models/task.model";
import { CreateTaskInput, UpdateTaskInput } from "./dto";
import { TaskId } from "./dto/task-id.input";
import { JwtAuthGuard } from "src/auth/strategy/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/strategy/current-user.decorator";
import { User } from "src/user/model/user.model";

@Resolver()
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService
  ) {}


  @UseGuards(JwtAuthGuard)
  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks()
  }

  @Query(() => Task)
  async getTaskById(
    @Args('id') id: TaskId
  ): Promise<Task> {
    return await this.taskService.findOneTask(id)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Task)
  async createTask(
    @Args('taskInput') taskInput: CreateTaskInput,
    @CurrentUser('subject') subject: string,
  ):Promise<Task> {
    // console.log(subject)
    return await this.taskService.addTask({
      title: taskInput.title, 
      description: taskInput.description, 
      status: taskInput.status, 
      userId: subject
    })
  }

  @Mutation(() => Task)
  async UpdateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput
  ):Promise<Task> { 
    return await this.taskService.updateTask({
      data: updateTaskInput,
      where: {
        id: updateTaskInput.id
      }
    })
  }
}