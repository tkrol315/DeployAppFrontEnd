import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http : HttpClient) {}

  getAllProjects(){
    return this.http.get('https://localhost:7183/deployapp/projects');
  }

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
