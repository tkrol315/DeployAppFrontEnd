import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectDto } from '../dto/project.dto';
import { Observable, filter, map, of } from 'rxjs';
import { DataService } from './dataservice';
import { ProjectRowDto } from '../dto/project.row.dto';
import { InstanceRowDto } from '../dto/instance.dto';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements DataService   {
  private url : string = "https://localhost:7183/deployapp/projects"
  constructor(private http : HttpClient) {}

  mapDataToRows(response : any) : ProjectRowDto[]{
    return response.map((item: any) => ({
      Id: item.id,
      Title: item.title,
      Description: item.description,
      IsActive: item.isActive, 
    }));
  }
  
  getDataWithFilters(filters: { [key: string]: any; }): Observable<any[]> {

    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== null && value !== undefined) {
        params = params.append(key, value);
      }
    });
    return this.http.get<[]>(this.url, {params});
  }
  
  removeClickedItem(id :number) : Observable<any>{
    console.log("usunalem element o id: " + id);
    return this.http.delete(`${this.url}/${id}`);
  }

  createNewProject(dto : ProjectDto) : Observable<ProjectDto>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
      )
    }
   return this.http.post<ProjectDto>(this.url,dto, httpOptions)
  }

  getProjectInstances(projId : number) : Observable<any[]>{
    return this.http.get<[]>(`${this.url}/${projId}/instances`);
  }
  
}
