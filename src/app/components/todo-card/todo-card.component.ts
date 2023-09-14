import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoDto } from '../todo-list/models/todo.dto';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {
  @Input() todo!: TodoDto;
  @Output() edit = new EventEmitter<TodoDto>();
  @Output() delete = new EventEmitter<string>();
  editing = false;
  originalTodo: TodoDto | undefined;

  public startEditing(): void {
    this.editing = true;
    // Create a copy of the todo to preserve the original values
    this.originalTodo = { ...this.todo };
  }

  public saveChanges(): void {
    if (this.todo.text?.length && this.todo.text.length > 0) {
      this.editing = false;
    }
    this.edit.emit(this.todo);
  }

  public cancelEditing(): void {
    this.editing = false;
    // Restore original values
    this.todo = { ...this.originalTodo };
  }

  public deleteTodo(): void {
    this.delete.emit(this.todo.id);
  }
}
