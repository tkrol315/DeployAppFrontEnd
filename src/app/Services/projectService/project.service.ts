import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectDto } from '../../shared/dto/project.dto';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DataGridViewService } from '../abstractions/data-grid-view-service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements DataGridViewService  {
  private url : string = `${environment.API_URL}/projects`
  constructor(private http : HttpClient) {}
  
  getProjects(filters?: { [key: string]: any; }): Observable<any[]> {

    let params = new HttpParams();
    if(filters){
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== undefined) {
        params = params.append(key, value === null ? '' : value.toString());
      }
    });
  }
  return this.http.get<any[]>(this.url, { params }).pipe(
    map(response => response.map(item => ({
      Id: item.id,
      Title: item.title,
      Description: item.description,
      IsActive: item.isActive
    })))
  );
  }

  getProjectById(id : string) : Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  
  removeProjectById(id :string) : Observable<Object>{
    return this.http.delete(`${this.url}/${id}`);
  }

  createNewProject(dto : ProjectDto) : Observable<ProjectDto>{
   return this.http.post<ProjectDto>(this.url,dto);
  }

  updateProject(id : string, dto : ProjectDto) : Observable<any>{
    return this.http.put(`${this.url}/${id}`, dto);
  }
  
}
