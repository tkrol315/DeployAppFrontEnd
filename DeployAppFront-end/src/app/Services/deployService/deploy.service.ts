import { Injectable } from '@angular/core';
import { DataGridViewDataService } from '../abstractions/data-grid-view-data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeployService implements DataGridViewDataService {

  private url : string = "https://localhost:7183/deployapp/projects"
  projectId! : number;
  constructor(private http : HttpClient) { }

  setProjectId(id : number) : void{
    this.projectId = id;
  }

  getDataWithFilters(filters: { [key: string]: any; }): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${this.projectId}/deploys`);
  }
  mapDataToRows(response: any): any[] {
    throw new Error('Method not implemented.');
  }
  removeClickedItem(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  
}
