import { Component, OnInit } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../Services/projectService/project.service';
import { HttpClientModule } from '@angular/common/http';
import { ColumnType } from '../../shared/enums/column-type';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataGridViewComponent,RouterModule, HttpClientModule],
  providers: [ProjectService],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
constructor(private projectService: ProjectService){}
 

  columns = [
    {name: "Project", header:"Project", type: ColumnType.Text, filter: false, visible: true},
    {name:"ProjectVersion", header:"ProjectVersion", type: ColumnType.Text, filter: false, visible: true},
    {name:"Instance", header:"Instance", type: ColumnType.Text, filter: false, visible: true},
    {name:"Status", header: "Status", type: ColumnType.Text, filter: false, visible: true},
    {name:"Timestamp", header: "Timestamp", type: ColumnType.Text, filter: false, visible: true}
  ];
  data = [
    {Project: "WebDMS", ProjectVersion:"1.27.1", Instance: "System testowy vsrvweb1:83", Status: "Pending"},
    {Project: "WebDMS", ProjectVersion:"1.27.1", Instance: "System testowy vsrvweb1:93", Status: "Pending"},
    {Project: "WebDMS", ProjectVersion:"1.27.1", Instance: "System testowy vsrvweb1:94", Status: "Completed", Timestamp:"2024.05.08 12:45:11"},
  ]


}
