import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectDto } from '../../dto/project.dto';
import { Observable } from 'rxjs';
import { ProjectRowDto } from '../../dto/project.row.dto';
import { DataGridViewDataService } from '../abstractions/data-grid-view-data.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService implements DataGridViewDataService   {
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
  
  getDataWithFilters(filters?: { [key: string]: any; }): Observable<any[]> {

    let params = new HttpParams();
    if(filters){
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== undefined) {
        params = params.append(key, value === null ? '' : value.toString());
      }
    });
  }
    return this.http.get<any[]>(this.url, {params});
  }

  getProjectById(id : number) : Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  
  removeClickedItem(id :number) : Observable<any>{
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

  
}
