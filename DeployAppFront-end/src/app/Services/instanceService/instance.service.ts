import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataGridViewDataService } from '../abstractions/data-grid-view-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceService implements DataGridViewDataService {

  private url : string = "https://localhost:7183/deployapp/projects"
  projectId! : number;
  constructor(private http : HttpClient) { }

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
}
