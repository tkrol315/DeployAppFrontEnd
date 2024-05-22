import { Component, OnInit } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../Services/project.service';
import { CreateProjectPopupComponent } from '../create-project-popup/create-project-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDto } from '../../dto/project.dto';
import { ProjectRowDto } from '../../dto/project.row.dto';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DataGridViewComponent, HttpClientModule, CreateProjectPopupComponent],
  providers: [ProjectService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  data : ProjectRowDto[]= [];
  projects: ProjectDto[] = [];
  constructor(private projectService: ProjectService,private modalService: NgbModal ){}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((response: any) => {
      this.data = response.map((item: any) => ({
        Title: item.title,
        Description: item.description,
        Active: item.isActive, 
        Actions: "Edit/Del"
      }));
      this.projects = response.map((item: any) => ({
        Title: item.title,
        Description: item.description,
        IsActive: item.isActive,
        YtCode: item.ytCode,
        RepositoryUrl: item.repositoryUrl
      }));
    });
  }
  
  columns = [
    {header:"Title", type: "text", filter: true},
    {header:"Description", type: "text", filter: true},
    {header:"Active", type: "checkbox", filter: false},
    {header: "Actions", type:"text", filter: false},
  ];
  
  openPopup(){
    const modalRef = this.modalService.open(CreateProjectPopupComponent);
    modalRef.componentInstance.projects = this.projects;

  }
}
