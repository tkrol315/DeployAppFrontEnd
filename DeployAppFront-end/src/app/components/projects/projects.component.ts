import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../Services/projectService/project.service';
import { ProjectRowDto } from '../../shared/dto/project.row.dto';
import { CreateBtnComponent } from '../create-btn/create-btn.component';
import { CreateProjectPopupComponent } from '../popups/create-project-popup/create-project-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataGridViewColumnDto } from '../../shared/dto/data-grid-view-column.dto';
import { ColumnType } from '../../shared/enums/column-type';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DataGridViewComponent, HttpClientModule, CreateProjectPopupComponent, CreateBtnComponent,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  providers: [ProjectService],
  templateUrl: './projects.component.html',
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
  
  columns : DataGridViewColumnDto[] = [
    {name:"Id", header:"Id", type: ColumnType.Text, filter: false, visible: false},
    {name:"Title", header:"Title", type: ColumnType.Text, filter: true, visible: true},
    {name:"Description", header:"Description", type: ColumnType.Text, filter: true, visible: true},
    {name:"IsActive", header:"IsActive", type: ColumnType.Checkbox, filter: true, visible: true},
  ];

  openPopup() : void{
    const modalRef = this.modalService.open(CreateProjectPopupComponent);
    modalRef.componentInstance.created.subscribe(()=> this.dataGridViewComponent.filter());
  }
}
