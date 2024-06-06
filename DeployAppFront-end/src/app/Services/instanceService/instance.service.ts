import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataGridViewDataService } from '../abstractions/data-grid-view-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceService implements DataGridViewDataService {

  private url : string = "https://localhost:7183/deployapp/projects"
  constructor(private http : HttpClient) { }
  
  getDataWithFilters(filters: { [key: string]: any}, secondPathPart? : string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${secondPathPart}`);
  }
  mapDataToRows(response: any): any[] {
    throw new Error('Method not implemented.');
  }
  removeClickedItem(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
