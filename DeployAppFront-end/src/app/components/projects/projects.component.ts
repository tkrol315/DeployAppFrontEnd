import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../Services/projectService/project.service';
import { ProjectRowDto } from '../../dto/project.row.dto';
import { CreateBtnComponent } from '../create-btn/create-btn.component';
import { CreateProjectPopupComponent } from '../popups/create-project-popup/create-project-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DataGridViewComponent, HttpClientModule, CreateProjectPopupComponent, CreateBtnComponent],
  providers: [ProjectService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit{

  @ViewChild(DataGridViewComponent) dataGridViewComponent!: DataGridViewComponent;

  data : ProjectRowDto[]= [];
  constructor(
    protected projectService: ProjectService,
    private cdr : ChangeDetectorRef,
    private modalService : NgbModal
  ){}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  
  columns : any[] = [
    {name:"Id", header:"Id", type: "text", filter: false, visible: false},
    {name:"Title", header:"Title", type: "text", filter: true, visible: true},
    {name:"Description", header:"Description", type: "text", filter: true, visible: true},
    {name:"IsActive", header:"IsActive", type: "checkbox", filter: true, visible: true},
  ];

  openPopup() : void{
    const modalRef = this.modalService.open(CreateProjectPopupComponent);
    modalRef.componentInstance.created.subscribe(()=> this.dataGridViewComponent.filter());
  }
}
