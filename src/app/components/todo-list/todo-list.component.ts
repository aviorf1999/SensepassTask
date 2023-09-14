import { Component, OnInit } from '@angular/core';
import { TodoDto } from './models/todo.dto';
import { TodoService } from '../../common/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: TodoDto[];
  newTodo: string;
  errMsg: string;

  constructor(private todoService: TodoService) {
    this.subscribeTodoEvents();
    this.fetchTodos();
    this.todos = [];
    this.newTodo = '';
    this.errMsg = '';
  }

  ngOnInit(): void {
  }

  public subscribeTodoEvents(): void {
    // Add event
    this.todoService.newTodoEvent.subscribe(newTodo => {
      this.todos.push(newTodo);
    });
    
    // Update event
    this.todoService.updateTodoEvent.subscribe(updatedTodo => {
      const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
        this.todos = [...this.todos];
      }
    });

    // Delete event
    this.todoService.deleteTodoEvent.subscribe(deletedTodo => {
      this.todos = this.todos.filter(todo => todo.id !== deletedTodo.id);
    });
  }

  public fetchTodos(): void {
    this.todoService.getAllTodos().subscribe(todos => {
      this.todos = todos;
      this.errMsg = "";
    },
    err => {
      this.errMsg = "Failed to fetch todos!";
    });
  }

  public addTodo(): void {
    if (this.newTodo.length > 0) {
      this.todoService.addTodo({ text: this.newTodo, done: false}).subscribe(res => {
        this.errMsg = "";
      }, err => {
        this.errMsg = "Failed to add todo!";
      });
    }
    else {
      this.errMsg = "No text received!";
    }
    this.newTodo = '';
  }

  public editTodo(updateTodo: TodoDto): void {
    if (updateTodo.text?.length && updateTodo.text.length > 0) {
      this.todoService.updateTodo(updateTodo).subscribe(res => {
        this.errMsg = "";
      }, err => {
        this.errMsg = "Failed to edit todo!";
      });
    }
    else {
      this.errMsg = "No text received!";
    }
  }

  public deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(res => {
      this.errMsg = "";
    }, err => {
      this.errMsg = "Failed to delete todo!";
    });
  }
}
