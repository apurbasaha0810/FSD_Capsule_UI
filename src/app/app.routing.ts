import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {ListTaskComponent} from "./list-task/list-task.component";
import {EditTaskComponent} from "./edit-task/edit-task.component";
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'list-task', component: ListTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: 'add-user', component: AddUserComponent },
  { path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
