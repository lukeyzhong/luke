import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Todo } from './todo.model';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseurl = 'https://jsonplaceholder.typicode.com';
  todoPath = 'todos';

  constructor(private http: HttpClient) {}
  
  getTodos(): Observable<any> {
    return this.http.get([this.baseurl, this.todoPath].join('/'));
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete([this.baseurl, this.todoPath, id].join('/'));
  }

  addTodo(newtodo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>([this.baseurl, this.todoPath].join('/'), newtodo);
  }
}
