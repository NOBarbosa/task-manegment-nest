import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get()
  findAllTasks(@Query() params: FindAllParameters): TaskDto[] | string {
    return this.taskService.findAllTasks(params);
  }

  @Put()
  update(@Body() task: TaskDto) {
    this.taskService.update(task);
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
