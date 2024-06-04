import { Component, OnInit } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../Services/project.service';
import { CreateProjectPopupComponent } from '../create-project-popup/create-project-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectRowDto } from '../../dto/project.row.dto';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private route: ActivatedRoute,
    protected projectService: ProjectService,
    private modalService: NgbModal 
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filters = {
        Title: params['Title'] || '',
        Description: params['Description'] || '',
        IsActive: params['IsActive'] || null
      };
  
      this.loadProjects(filters);
    });
   
  }

  
  columns = [
    {header:"Id", type: "text", filter: false, visible: false},
    {header:"Title", type: "text", filter: true, visible: true},
    {header:"Description", type: "text", filter: true, visible: true},
    {header:"IsActive", type: "checkbox", filter: false, visible: true},
  ];
  
  openPopup(){
    const modalRef = this.modalService.open(CreateProjectPopupComponent);
    modalRef.componentInstance.projectAdded.subscribe(() => {
      this.route.queryParams.subscribe(params => {
        const filters = {
          Title: params['Title'] || '',
          Description: params['Description'] || '',
          IsActive: params['IsActive'] || null
        };
        this.loadProjects(filters);
      });
    });

  }

  loadProjects(filters: { [key: string]: any }): void{
    this.projectService.getDataWithFilters(filters).subscribe((response: any) => {
      this.data = response.map((item: any) => ({
        Id: item.id,
        Title: item.title,
        Description: item.description,
        IsActive: item.isActive, 
      }));
    });
  }
}
