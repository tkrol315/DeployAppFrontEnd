import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InstanceDto } from '../../shared/dto/instance.dto';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DataGridViewService } from '../abstractions/data-grid-view-service';

@Injectable({
  providedIn: 'root'
})
export class InstanceService implements DataGridViewService {

  private url : string = `${environment.API_URL}/projects`
  constructor(private http : HttpClient, private route: ActivatedRoute) {}
  
  getInstances(projectId : string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${projectId}/instances`).pipe(
      map(response => response.map((i: any) => ({
        Id: i.id,
        Name: i.name,
        Type: i.typeDescription,
        CurrentVersion: i.projectVersion === null ? "No version" : i.projectVersion.versionString
      })))
    );
  }
  
  removeInstanceById(projectId : string, instanceId: string): Observable<any> {
    return this.http.delete(`${this.url}/${projectId}/instances/${instanceId}`);
  }

  CreateInstance(projectId : string,dto : InstanceDto) : Observable<any>{
    return this.http.post(`${this.url}/${projectId}/instances`, dto);
  }
}
