import { Component, OnInit } from '@angular/core';
import { TaskService } from "../service/task.service";
import { Router } from "@angular/router";
import { Task } from "../model/task.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  priority: number = 0;
  options: Options = {
    floor: 0,
    ceil: 30
  };


  task: Task;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");

    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-task']);
      return;
    }
    this.editForm = this.formBuilder.group({
      task_id: [],
      parent_id: [],
      task: [''],
      priority: [''],
      parent_task: [''],
      start_date: [''],
      end_date: [''],
      finished: []
    });
    this.taskService.getTaskById(+userId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.taskService.updateTask(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-task']);
        },
        error => {
          alert(error);
        });
  }

}