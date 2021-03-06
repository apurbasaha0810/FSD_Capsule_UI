import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from "../model/task.model";

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/task-manager/tasks';

  getTasks(sortBy: string) {
    return this.http.get<Task[]>(this.baseUrl+'/sortBy/'+sortBy);
  }

  getTaskById(task_id: number) {
    return this.http.get<Task>(this.baseUrl+'/'+task_id);
  }

  createTask(task: Task) {
    console.log(task);
    return this.http.post(this.baseUrl, task);
  }

  updateTask(user: Task) {
    return this.http.put(this.baseUrl + '/' + user.task_id,user);
  }

  endTask(task_id: number) {
    return this.http.delete(this.baseUrl + '/finish/' + task_id);
  }

  getAllParentTasks() {
    return this.http.get<Task[]>(this.baseUrl + '/getAllParentTasks');
  }
  
}
