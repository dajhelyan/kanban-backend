import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { Task } from "./models/task.model";
import { CreateTaskInput, UpdateTaskInput } from "./dto";
import { TaskId } from "./dto/task-id.input";

@Resolver()
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService
  ) {}

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

  @Mutation(() => Task)
  async createTask(
    @Args('taskInput') taskInput: CreateTaskInput
  ):Promise<Task> {
    return await this.taskService.addTask(taskInput)
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