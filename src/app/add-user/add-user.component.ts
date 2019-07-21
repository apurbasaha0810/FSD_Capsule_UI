import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  addUserForm: FormGroup;
  users: User[];

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      employee_id: ['', Validators.required]
    });

    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  resetUser() {
    this.addUserForm.reset();
  }

  onSubmit() {
    this.userService.createTask(this.addUserForm.value)
      .subscribe(data => {
        this.router.navigate(['add-user']);
      });
  }

  viewTask(): void {
    this.router.navigate(['list-task']);
  };

  addTask(): void {
    this.router.navigate(['add-task']);
  };

}