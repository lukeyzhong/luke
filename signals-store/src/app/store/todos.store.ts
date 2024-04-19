import { Todo } from '../todolist/todo.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodoService } from '../todolist/todo.service';
import { computed, inject } from '@angular/core';

export type TodosFilter = 'all' | 'pending' | 'completed';

// explain 
type TodosSate = {
  todos: Todo[];
  filter: TodosFilter;
};

const initialState: TodosSate = {
  todos: [],
  filter: 'all',
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadAll() {
      todoService.getTodos().subscribe((data) => {
        patchState(store, { todos: data });
      });
    },
    deleteTodo(id: any) {
      const todolist = store.todos().filter((ele: any) => +ele.id !== +id);
      patchState(store, { todos: todolist });
    },
    addTodo(input: string) {
      const newtodo: Todo = {
        // id: 201,
        // userId: 201
        title: input,
        completed: false,
      };
      patchState(store, { todos: [newtodo, ...store.todos()] });
      
    },
    updateTodo(id: number | undefined, completed: boolean) {
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        ),
      }));
      console.log(store.todos());
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      switch (state.filter()) {
        case 'all':
          return todos;
        case 'pending':
          return todos.filter((todo) => todo.completed === false);
        case 'completed':
          return todos.filter((todo) => todo.completed === true);
      }
    }),
  }))
);
