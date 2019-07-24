import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private filterPipe: FilterPipe) { }

  addUserForm: FormGroup;
  users: User[];
  submitted: boolean = false;
  invalidUser: boolean = false;
  userFilter: any = {first_name:''};

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [],
      first_name: ['', Validators.required],
      last_name: '',
      employee_id: ['', Validators.required]
    });
    this.getUsers('first_name');
  }

  getUsers(sortBy: string) {
    this.userService.getUsers(sortBy, 'projectNotAssigned')
      .subscribe(data => {
        this.users = data;
      });
  }

  resetUser() {
    this.addUserForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }
    this.userService.createUser(this.addUserForm.value)
      .subscribe(data => {
        this.getUsers('first_name');
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.employee_id)
      .subscribe(data => {
        this.getUsers('first_name');
      });
  }

  viewTask(): void {
    this.router.navigate(['list-task']);
  };

  addTask(): void {
    this.router.navigate(['add-task']);
  };

  addProject(): void {
    this.router.navigate(['add-project']);
  };

}