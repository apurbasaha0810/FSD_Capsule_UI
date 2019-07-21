import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/task-manager/users';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  createTask(user: User) {
    return this.http.post(this.baseUrl, user);
  }

}
