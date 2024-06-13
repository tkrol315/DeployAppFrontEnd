import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DataGridViewDataService } from '../abstractions/data-grid-view-data.service';
import { Observable } from 'rxjs';
import { InstanceDto } from '../../shared/dto/instance.dto';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstanceService implements DataGridViewDataService {

  private url : string = `${environment.API_URL}/projects`
  projectId! : number;
  constructor(private http : HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params =>{
      this.projectId = +params['id'];
    })
   }

  setProjectId(id : number) : void{
     this.projectId = id;
  }
  
  getDataWithFilters(filters: { [key: string]: any}): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${this.projectId}/instances`);

  }
  mapDataToRows(response: any): any[] {
    return response.map((item: any) => ({
      Id: item.id,
      Name: item.name,
      Type: item.typeDescription,
      CurrentVersion: item.projectVersion === null ? "No version" : item.projectVersion.versionString
    }));
  }
  removeClickedItem(instanceId: number): Observable<any> {
    return this.http.delete(`${this.url}/${this.projectId}/instances/${instanceId}`);
  }

  CreateInstance(projectId : number,dto : InstanceDto) : Observable<any>{
    return this.http.post(`${this.url}/${projectId}/instances`, dto);
  }
}
