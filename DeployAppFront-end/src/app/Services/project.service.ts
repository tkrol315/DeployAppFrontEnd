import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectDto } from '../dto/project.dto';
import { Observable, filter, map } from 'rxjs';
import { DataService } from './dataservice';
import { ProjectRowDto } from '../dto/project.row.dto';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements DataService   {
  private url : string = "https://localhost:7183/deployapp/projects"
  constructor(private http : HttpClient) {}
  
  getDataWithFilters(filters: { [key: string]: any; }): Observable<any[]> {

    // let params = new HttpParams();
    // Object.keys(filters).forEach(key => {
    //   const value = filters[key];
    //   if (value !== null && value !== undefined) {
    //     params = params.append(key, value);
    //   }
    // });

    return this.http.get<[]>(this.url);
  }
  
  // getAllProjects() : Observable<ProjectDto[]>{
    
  // }

  createNewProject(dto : ProjectDto) : Observable<ProjectDto>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
      )
    }
   return this.http.post<ProjectDto>(this.url,dto, httpOptions)
  }

  
}
