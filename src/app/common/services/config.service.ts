import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public readonly apiUrl = "http://localhost:3000/todo";
  
  constructor() { }
}
