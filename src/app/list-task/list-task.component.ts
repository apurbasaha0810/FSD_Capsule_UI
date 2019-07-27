import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Task } from "../model/task.model";
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']

})
export class ListTaskComponent implements OnInit {

  constructor(private router: Router, private taskService: TaskService) { }

  tasks: Task[];
  taskFilter: any = { task: '' };

  ngOnInit() {
    this.taskService.getTasks('priority')
      .subscribe(data => {
        this.tasks = data;
      });
  }

  endTask(user: Task): void {
    this.taskService.endTask(user.task_id)
      .subscribe(data => {
        this.taskService.getTasks('priority')
          .subscribe(data => {
            this.tasks = data;
          });
      })
  };

  sort(sortBy: string): void {
    this.taskService.getTasks(sortBy)
      .subscribe(data => {
        this.tasks = data;
      });
  }

  editTask(task: Task): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", task.task_id.toString());
    this.router.navigate(['edit-task']);
  };

  addTask(): void {
    this.router.navigate(['add-task']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  addProject(): void {
    this.router.navigate(['add-project']);
  };

}