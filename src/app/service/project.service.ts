import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/task-manager/projects';

  addProject(project: Project) {
    return this.http.post(this.baseUrl, project);
  }

  getAllProjects(sortBy: string) {
    return this.http.get<Project[]>(this.baseUrl +'/'+sortBy);
  }

  suspendProject(projectId: number){
    return this.http.get(this.baseUrl + '/suspendProject/' + projectId);
  }

  activateProject(projectId: number){
    return this.http.get(this.baseUrl + '/activateProject/' + projectId);
  }

  getAllActiveProjects() {
    return this.http.get<Project[]>(this.baseUrl +'/getAllActiveProjects');
  }

}
