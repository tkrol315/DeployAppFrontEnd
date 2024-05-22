import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectDto } from '../dto/project.dto';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url : string = "https://localhost:7183/deployapp/projects"
  constructor(private http : HttpClient) {}
  
  getAllProjects() : Observable<ProjectDto[]>{
    return this.http.get<ProjectDto[]>(this.url);
  }

  //not work, maby api problem (from swagger works)
  createNewProject(dto : ProjectDto) : Observable<ProjectDto>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key':'value',
      }
      )
    }
   return this.http.post<ProjectDto>(this.url,dto, httpOptions);
  }
  //==================================================

  //not implemented
  getDashboardInfo(){
    const projects =  this.http.get('https://localhost:7183/deployapp/projects');
    // projects.forEach(proj => {
    //     const deploys = this.http.get('https://localhost:7183/deployapp/projects/${proj.Id}/deploys')
    //     const versinos = deploys.forEach(d => this.http.get('https://localhost:7183/deployapp/projects/${proj.Id}/deploys'))
    // });
    return this.http.get('https://localhost:7183/deployapp/projects');
  }
  //================
  
}
