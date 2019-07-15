import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from "../model/task.model";

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/task-manager/tasks';

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTaskById(task_id: number) {
    return this.http.get<Task>(this.baseUrl + '/' + task_id);
  }

  createTask(task: Task) {
    console.log(task);
    return this.http.post(this.baseUrl, task);
  }

  updateTask(user: Task) {
    return this.http.put(this.baseUrl + '/' + user.task_id,user);
  }

  finishTask(task_id: number) {
    return this.http.delete(this.baseUrl + '/finish/' + task_id);
  }
  
}
