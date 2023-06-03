export interface CreateTaskDto {
  title: string
  description: string
  status: StatusEnum
}

enum StatusEnum {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
