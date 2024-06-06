import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ProjectService } from '../../Services/projectService/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { projectDetailsDto } from '../../dto/projectDetails.dto';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { InstanceService } from '../../Services/instanceService/instance.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, DataGridViewComponent],
  providers: [ProjectService, InstanceService],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {  

  projectDetailsForm : FormGroup
  projectId : number = 0;
  project: projectDetailsDto = new projectDetailsDto();
  instanceColumns : any[] = [
    {columnName:"Id", header:"Id", type: "text", filter: false, visible: false},
    {columnName:"Name", header:"Name", type: "text", filter: false, visible: true},
    {columnName:"Type", header:"Type", type: "text", filter: false, visible: true},
    {columnName:"CurrentVersion", header:"Current version", type: "text", filter: false, visible: true},]
  instances : any[] = [];
  
  constructor(
    private formBuilder : FormBuilder,
     private projectService : ProjectService,
      private route : ActivatedRoute,
      private router : Router,
      protected instanceService : InstanceService
    ) {
    this.projectDetailsForm = this.formBuilder.group({
      title : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description : new FormControl('', [Validators.required, Validators.maxLength(250)])
    })
  }
  ngOnInit(): void {
    const projId = this.route.snapshot.paramMap.get('id');
    if( projId != null){
      this.projectId = +projId;
      this.projectService.getProjectById(this.projectId)
      .subscribe({
        next: (response : any)=>{
          this.projectDetailsForm.patchValue({
            title: response.title,
            description: response.description
          });
        },
        error: (error : any)  => {
          console.error('Error fetching project details:', error);
          this.router.navigate(["projects"]);
        }
      });
     this.instanceService.getDataWithFilters({}, `${projId}/instances`).subscribe({
        next: (response : any)=>{
          this.instances = response.map((el : any)=> ({
            Id: el.id,
            Name: el.name,
            Type: el.typeDescription,
            CurrentVersion: el.projectVersion.versionString
          }))
          console.log(response);
        },
        error: (error : any) =>{
          console.log(error);
        }
    });
    }
    else{
      this.router.navigate(["projects"]);
    }
  }
}
