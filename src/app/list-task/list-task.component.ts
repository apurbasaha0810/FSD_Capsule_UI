import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Task} from "../model/task.model";
import { FilterPipe } from 'ngx-filter-pipe';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
   
})
export class ListTaskComponent implements OnInit {

public minDate: Date = new Date ("05/07/2017");
    public maxDate: Date = new Date ("05/27/2030");
    private k: Date = new Date ("05/16/2017");

  taskFilter: any = { task: '',parent_task:'',start_date:'',end_date:'',priority:''};
   
  tasks: Task[];

  constructor(private router: Router, private taskService: TaskService,private filterPipe: FilterPipe) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe( data => {
        this.tasks = data;
      });
  }
  
  finishTask(user: Task): void {
    this.taskService.finishTask(user.task_id)
      .subscribe( data => {
	  this.taskService.getTasks()
      .subscribe( data => {
        this.tasks = data;
      });
      })
	  
  };
  
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
