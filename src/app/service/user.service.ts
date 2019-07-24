import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/task-manager/users';

  getUsers(sortBy: string, projAsigndFlg: string) {
    return this.http.get<User[]>(this.baseUrl +'/'+sortBy+'/'+projAsigndFlg);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  deleteUser(employee_id: number) {
    return this.http.delete(this.baseUrl + '/deleteUser/' + employee_id);
  }

}
