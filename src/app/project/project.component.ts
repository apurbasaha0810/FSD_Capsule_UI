import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private userService: UserService, private projectService: ProjectService) { }

  projectForm: FormGroup;
  closeResult: string;
  users: User[];
  projects: Project[];
  submitted = false;
  isEditProject = false;
  isErrorFound = false;
  checkboxValue: boolean;
  errorMessage: string = "No error";
  datePipe: DatePipe = new DatePipe("en-US");
  projectFilter: any = {project_name:''};
  options: Options = {
    floor: 0,
    ceil: 30
  };

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      project_name: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      manager_id: '',
      manager_name: new FormControl('', Validators.required)
    });
    this.getAllProjects('priority');
  }

  viewTask(): void {
    this.router.navigate(['list-task']);
  };

  addTask(): void {
    this.router.navigate(['add-task']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  private findAllUsersWithNoProject() {
    this.userService.getUsers('first_name', 'projectAssigned')
      .subscribe(data => {
        this.users = data;
      });
  }

  open(content: any) {
    this.findAllUsersWithNoProject();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((user) => {
      this.projectForm.patchValue({ 'manager_id': user.user_id });
      this.projectForm.patchValue({ 'manager_name': user.first_name + ' ' + user.last_name });
      console.log("UserId:" + user.user_id);
    }, (reason) => {
      this.closeResult = 'Dismissed';
    });
  }

  setStartAndEndDate() {
    let startDate = "";
    let endDate = "";
    if (this.checkboxValue) {
      let nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      endDate = this.datePipe.transform(nextDate, 'yyyy-MM-dd');
    }
    this.projectForm.patchValue({ 'start_date': startDate });
    this.projectForm.patchValue({ 'end_date': endDate });
  }

  resetProject() {
    this.submitted = false;
    this.isEditProject = false;
    this.isErrorFound = false;
    this.errorMessage = "";
    this.checkboxValue = false;
    this.projectForm.reset();
    this.projectForm.patchValue({ 'project_priority': 0 });
  }

  get formField() { return this.projectForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log("ManagerID - " + this.projectForm.value.manager_id
      + ", ProjectName - " + this.projectForm.value.project_name
      + ", StartDate - " + this.projectForm.value.start_date
      + ", EndDate - " + this.projectForm.value.end_date
      + ", Prirority - " + this.projectForm.value.priority
    );

    if (this.projectForm.invalid) {
      return;
    }

    if (this.projectForm.value.project_priority == 0) {
      this.projectForm.value.project_priority = 15;
    }

    this.submitted = false;

    if (new Date(this.projectForm.value.start_date).getTime() > new Date(this.projectForm.value.end_date).getTime()) {
      this.isErrorFound = true;
      this.errorMessage = "End date should be grearter than Start date";
      return;
    }

    if (!this.projectForm.value.manager_id) {
      this.isErrorFound = true;
      this.errorMessage = "Enter a manager id";
      return;
    }

    /*if (this.projectForm.value.project_id) {
      this.apiProjectService.updateProject(this.addForm.value).subscribe((data: any) => {
        if (data.error_message) {
          this.isErrorFound = true;
          this.errorMessage = data.error_message;
          return;
        }

        this.isEditProject = false;
        this.ngOnInit();
      });
    }else {*/
    this.projectService.addProject(this.projectForm.value).subscribe((data: any) => {
      this.ngOnInit();
    });
    //}
    //this.ngOnInit();
  }

  getAllProjects(sortBy: string) {
    this.projectService.getAllProjects(sortBy)
      .subscribe(data => {
        this.projects = data;
      });
  }

  suspendProject(projectId: number) {
    this.projectService.suspendProject(projectId).subscribe(response => this.ngOnInit(), err => {
      throw err;
    });
  }

  activateProject(projectId: number) {
    this.projectService.activateProject(projectId).subscribe(response => this.ngOnInit(), err => {
      throw err;
    });
  }

}
