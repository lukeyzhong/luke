import {
  Component,
  ElementRef,
  OnInit,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';
import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoStore, TodosFilter } from '../store/todos.store';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule, NgClass],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  todoService = inject(TodoService);
  todoStore = inject(TodoStore);
  inputTodo: string = '';

  filterTag = viewChild.required<ElementRef>('filtering');

  constructor() {
    // effect(() => {
    //   const filterTag= this.filterTag();
    //   filterTag.nativeElement.value = this.todoStore.filter();
    //   console.log('effect');
    // });
  }

  ngOnInit(): void {
    this.todoStore.loadAll();
  }

  deletetodo(id: number | undefined) {
    this.todoStore.deleteTodo(id);
  }

  addtodo(input: string) {
    this.todoStore.addTodo(input);
    this.inputTodo = '';
  }

  onToggle(id: number | undefined, completed: boolean) {
    completed = !completed;
    this.todoStore.updateTodo(id, completed)
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value as TodosFilter;
    this.todoStore.updateFilter(filterValue)
  } 
}
