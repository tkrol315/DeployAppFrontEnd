import { Component, OnInit, ViewChild } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../Services/projectService/project.service';
import { CreateProjectPopupComponent } from '../create-project-popup/create-project-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectRowDto } from '../../dto/project.row.dto';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DataGridViewComponent, HttpClientModule, CreateProjectPopupComponent],
  providers: [ProjectService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  @ViewChild(DataGridViewComponent) dataGridViewComponent!: DataGridViewComponent;

  data : ProjectRowDto[]= [];
  constructor(
    protected projectService: ProjectService,
    private modalService: NgbModal  ){}
  
  columns : any[] = [
    {name:"Id", header:"Id", type: "text", filter: false, visible: false},
    {name:"Title", header:"Title", type: "text", filter: true, visible: true},
    {name:"Description", header:"Description", type: "text", filter: true, visible: true},
    {name:"IsActive", header:"IsActive", type: "checkbox", filter: true, visible: true},
  ];
  
  openPopup(){
    const modalRef = this.modalService.open(CreateProjectPopupComponent);
    modalRef.componentInstance.projectAdded.subscribe(() => this.dataGridViewComponent.filter());
  }

}
