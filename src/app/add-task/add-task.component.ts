import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';
import { TaskService } from '../service/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project.model';
import { ParentTask } from '../model/parentTask.model';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private projectService: ProjectService,
    private taskService: TaskService, private userService: UserService, private modalService: NgbModal) { }

  addForm: FormGroup;
  parentCheckbox: Boolean;
  closeResult: string;
  activeProjectList: Project[];
  parentTaskList: ParentTask[];
  userList: User[];

  ngOnInit() {
    this.getParentTaskList();
    this.findAllActiveProjects();
    this.getUserList();

    this.addForm = this.formBuilder.group({
      task_id: [],
      task: ['', Validators.required],
      priority: ['', Validators.required],
      parent_id: [],
      parent_task: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      project_id: [],
      project_name: ['', Validators.required],
      user_id: [],
      user_name: ['', Validators.required]
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

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  addProject(): void {
    this.router.navigate(['add-project']);
  };

  toggle() {
    this.disableField('start_date');
    this.disableField('end_date');
  }

  private disableField(controlerName: string) {
    let control = this.addForm.get(controlerName)
    control.disabled ? control.enable() : control.disable();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((response: any) => {
      if (response['project_id']) {
        this.addForm.patchValue({ 'project_id': response['project_id'] });
        this.addForm.patchValue({ 'project_name': response['project_name'] });
      } else if (response['user_id']) {
        this.addForm.patchValue({ 'user_id': response['user_id'] });
        this.addForm.patchValue({ 'user_name': (response['first_name']+' '+response['last_name'])});
      } else if (response['parent_id']) {
        this.addForm.patchValue({ 'parent_id': response['parent_id'] });
        this.addForm.patchValue({ 'parent_task': response['parent_task'] });
      }
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  private findAllActiveProjects() {
    this.projectService.getAllActiveProjects().subscribe(response => this.activeProjectList = response);
  }

  private getParentTaskList() {
    this.taskService.getAllParentTasks().subscribe((data: any) => {
      this.parentTaskList = data;
    });
  }

  private getUserList() {
    this.userService.getUsers('first_name', 'NA', 'N')
      .subscribe(data => {
        this.userList = data;
      });
  }

}