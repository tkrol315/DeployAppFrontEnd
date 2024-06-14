import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataGridViewService } from '../abstractions/data-grid-view-service';

@Injectable({
  providedIn: 'root'
})
export class DeployService implements DataGridViewService {

  private url : string = `${environment.API_URL}/projects`
  constructor(private http : HttpClient) { }

  getDeploys(projectId : string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${projectId}/deploys`).pipe(
      map((deploys) => deploys.map((d : any)=>({
        Id: d.id,
        Version: d.projectVersionString,
        AvailableFrom: d.start,
        AvailableTo: d.end,
        Active: d.isActive,
      })))
    );
  }

  removeDeployById(projectId: string, deployId : string): Observable<any> {
    return this.http.delete(`${this.url}/${projectId}/deploys/${deployId}`);
  }

}
