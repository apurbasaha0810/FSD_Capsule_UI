import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  private value: number = 1;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  public minDate: Date = new Date("05/07/2017");
  public maxDate: Date = new Date("05/27/2030");
  private k: Date = new Date("05/16/2017");

  constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService) { }
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      task: ['', Validators.required],
      priority: ['', Validators.required],
      parent_task: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });

  }

  resetTask() {
    this.addForm.reset();
  }

  onSubmit() {
    this.taskService.createTask(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-task']);
      });
  }

  viewTask(): void {
    this.router.navigate(['list-task']);
  };
}