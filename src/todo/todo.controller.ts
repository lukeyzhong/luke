import { Controller, Get } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todoService.getAlltodos();
  }
}
