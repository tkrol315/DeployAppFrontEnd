import { Component, OnInit } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../Services/project.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataGridViewComponent,RouterModule, HttpClientModule],
  providers: [ProjectService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
constructor(private projectService: ProjectService){}
 

  columns = [
    {header:"Project", type: "text", filter: false, visible: true},
    {header:"ProjectVersion", type: "text", filter: false, visible: true},
    {header:"Instance", type: "text", filter: false, visible: true},
    {header: "Status", type:"text", filter: false, visible: true},
    {header: "Timestamp", type:"text", filter: false, visible: true}
  ];
  data = [
    {Project: "WebDMS", ProjectVersion:"1.27.1", Instance: "System testowy vsrvweb1:83", Status: "Pending"},
    {Project: "WebDMS", ProjectVersion:"1.27.1", Instance: "System testowy vsrvweb1:93", Status: "Pending"},
    {Project: "WebDMS", ProjectVersion:"1.27.1", Instance: "System testowy vsrvweb1:94", Status: "Completed", Timestamp:"2024.05.08 12:45:11"},
  ]


}
