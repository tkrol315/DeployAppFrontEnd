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

  dataUrl : string; 
  projectDetailsForm : FormGroup
  projectId : number = 0;
  project: projectDetailsDto = new projectDetailsDto();
  instanceColumns : any[] = [
    {name:"Id", header:"Id", type: "text", filter: false, visible: false},
    {name:"Name", header:"Name", type: "text", filter: false, visible: true},
    {name:"Type", header:"Type", type: "text", filter: false, visible: true},
    {name:"CurrentVersion", header:"Current version", type: "text", filter: false, visible: true},]
  instances : any[] = [];
  
  constructor(
    private formBuilder : FormBuilder,
     private projectService : ProjectService,
      private route : ActivatedRoute,
      private router : Router,
      protected instanceService : InstanceService
    ) {
     this.projectDetailsForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId != null) {
      this.projectId = +projectId;
      this.dataUrl = `https://localhost:7183/deployapp/projects/${this.projectId}/instances`;
    } else {
      this.dataUrl = '';
      this.router.navigate(["projects"]);
    }
  }
  ngOnInit(): void {
    
    if (this.projectId) {
       this.loadProjectDetails();
       this.instanceService.setProjectId(this.projectId);
    } else {
      this.router.navigate(["projects"]);
    }
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

}

