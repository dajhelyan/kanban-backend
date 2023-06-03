import { StatusEnum } from "."

export interface UpdateTaskDto {
  title: string
  description: string
  status: StatusEnum
}