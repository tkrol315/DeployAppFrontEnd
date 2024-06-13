import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ProjectService } from '../../Services/projectService/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { InstanceService } from '../../Services/instanceService/instance.service';
import { CreateBtnComponent } from '../create-btn/create-btn.component';
import { CreateInstancePopupComponent } from '../popups/create-instance-popup/create-instance-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDeployPopupComponent } from '../popups/create-deploy-popup/create-deploy-popup.component';
import { DeployService } from '../../Services/deployService/deploy.service';
import { ProjectDto } from '../../shared/dto/project.dto';
import { DataGridViewColumnDto } from '../../shared/dto/data-grid-view-column.dto';
import { ColumnType } from '../../shared/enums/column-type';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, DataGridViewComponent, CreateBtnComponent],
  providers: [ProjectService, InstanceService, DeployService],
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {  

  instanceUrl! : string;
  deployUrl! : string;  
  projectDetailsForm : FormGroup
  projectId! : number;
  projectTitle!: string;
  projectDescription!: string;

  instanceColumns : DataGridViewColumnDto[] = [
    {name:"Id", header:"Id", type: ColumnType.Text, filter: false, visible: false},
    {name:"Name", header:"Name", type: ColumnType.Text, filter: false, visible: true},
    {name:"Type", header:"Type", type: ColumnType.Text, filter: false, visible: true},
    {name:"CurrentVersion", header:"Current version", type: ColumnType.Text, filter: false, visible: true},]
  instances : any[] = [];

  deployColumns : DataGridViewColumnDto[] = [
    {name: "Id", header: "Id", type: ColumnType.Text, filter: false, visible:false},
    {name: "Version", header: "Version", type: ColumnType.Text, filter: false, visible: true},
    {name: "AvailableFrom", header: "Available from", type: ColumnType.Text, filter: false, visible:true},
    {name: "AvailableTo", header: "Available to", type: ColumnType.Text, filter: false, visible:true},
    {name: "Active", header: "Active", type: ColumnType.Checkbox, filter: false, visible:true},
    {name: "Instances", header: "Instances", type: ColumnType.Text, filter: false, visible:true},
  ]
  deploys : any[] = [];

  createInstancePopupComponent : any = CreateInstancePopupComponent;
  @ViewChild(DataGridViewComponent) dataGridViewComponent!: DataGridViewComponent;
  
  constructor(
    private formBuilder : FormBuilder,
    private projectService : ProjectService,
    protected instanceService : InstanceService,
    protected deployService : DeployService,
    private modalService : NgbModal,
    private route : ActivatedRoute,
    private router : Router,
    private cdr: ChangeDetectorRef
  ) {

      this.projectDetailsForm = this.formBuilder.group({
        title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(250)])
      });
    }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.projectId = +params['id'];
        this.instanceService.setProjectId(this.projectId);
        this.instanceUrl = `projects/${this.projectId}/instances`;
        this.deployUrl = `projects/${this.projectId}/deploys`;
        this.loadProjectDetails();
        this.instanceService.setProjectId(this.projectId);
      })
    }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  private loadProjectDetails() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (response: any) => {
        this.projectDetailsForm.patchValue({
          title: response.title,
          description: response.description
        });
      },
      error: (error: any) => {
        console.error('Error fetching project details:', error);
        this.router.navigate(["projects"]);
      }
    });
  }

  onBlur() : void{
    let dto : ProjectDto;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: r => {
        dto = {
          Title: r.title,
          Description: r.description,
          IsActive: r.isActive,
          YtCode: r.ytCode,
          RepositoryUrl: r.repositoryUrl
        };
        if(this.projectTitle === dto.Title && this.projectDescription === dto.Description)
          return;
        if(this.projectDetailsForm.invalid){
          this.projectTitle = dto.Title;
          this.projectDescription = dto.Description;
        }
        else{
          dto.Title = this.projectTitle;
          dto.Description = this.projectDescription;
          this.projectService.updateProject(this.projectId,dto).subscribe();
        }
      },
      error: (error : any) =>{
        console.error(error);
      }
    }
    )
  }

  openPopup(name : string) : void{
    const popup = name === 'instance' ? CreateInstancePopupComponent : CreateDeployPopupComponent;
    const modalRef = this.modalService.open(popup);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.created.subscribe(()=> this.dataGridViewComponent.filter());
  }
}

