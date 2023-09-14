import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { TodoDto } from '../../components/todo-list/models/todo.dto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly NEW_TODO_EVENT_NAME: string = 'newTodo';
  private readonly UPDATE_TODO_EVENT_NAME: string = 'updatedTodo';
  private readonly DELETED_TODO_EVENT_NAME: string = 'deletedTodo';
  newTodoEvent: Observable<TodoDto>;
  updateTodoEvent: Observable<TodoDto>;
  deleteTodoEvent: Observable<TodoDto>;

  constructor(private configService: ConfigService, private httpClient: HttpClient, private socket: Socket) {
    this.socket.connect();
    this.newTodoEvent = this.socket.fromEvent<TodoDto>(this.NEW_TODO_EVENT_NAME);
    this.updateTodoEvent = this.socket.fromEvent<TodoDto>(this.UPDATE_TODO_EVENT_NAME);
    this.deleteTodoEvent = this.socket.fromEvent<TodoDto>(this.DELETED_TODO_EVENT_NAME);
  }

  getAllTodos(): Observable<TodoDto[]> {
    return this.httpClient.get<TodoDto[]>(`${this.configService.apiUrl}`);
  }

  getTodoById(id: string): Observable<TodoDto> {
    return this.httpClient.get<TodoDto>(`${this.configService.apiUrl}/${id}`);
  }

  addTodo(todo: TodoDto): Observable<TodoDto> {
    return this.httpClient.post<TodoDto>(`${this.configService.apiUrl}`, todo);
  }

  updateTodo(todo: TodoDto): Observable<TodoDto> {
    return this.httpClient.put<TodoDto>(`${this.configService.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: string): Observable<TodoDto> {
    return this.httpClient.delete<TodoDto>(`${this.configService.apiUrl}/${id}`);
  }
}
