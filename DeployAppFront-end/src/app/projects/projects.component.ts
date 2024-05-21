import { Component, OnInit } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../Services/project.service';
import { CreateProjectPopupComponent } from '../create-project-popup/create-project-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DataGridViewComponent, HttpClientModule, CreateProjectPopupComponent],
  providers: [ProjectService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  constructor(private projectService: ProjectService,private modalService: NgbModal ){}
  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((response: any) => {
      this.data = response.map((item: any) => ({
        Title: item.title,
        Description: item.description,
        Active: item.isActive, 
        Actions: "Edit/Del"
      }));
  });
  }
  columns = [
    {header:"Title", type: "text", filter: true},
    {header:"Description", type: "text", filter: true},
    {header:"Active", type: "checkbox", filter: false},
    {header: "Actions", type:"text", filter: false},
  ];
  data = []
  openPopup(){
    const modalRef = this.modalService.open(CreateProjectPopupComponent)
  }
}
