import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);
    if (foundTask.length) {
      return foundTask[0];
    }
    throw new HttpException(
      `Task with id: ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAllTasks(params: FindAllParameters): TaskDto[] | string {
    if (!this.tasks.length) {
      return `Você ainda não possui tasks`;
    }
    return this.tasks.filter((t) => {
      let match = true;
      if (params.title && t.title.includes(params.title)) {
        match = false;
      }

      if (params.status && t.status.includes(params.status)) {
        match = false;
      }
      return match;
    });
  }
  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => (t.id = task.id));

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(
      `Task with id: $${task.id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new HttpException(
      `Task with id: $${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
