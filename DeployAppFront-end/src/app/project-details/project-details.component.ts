import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../Services/project.service';
import { InstanceRowDto } from '../dto/instance.dto';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [],
  providers: [ProjectService],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {  

  projectDetailsForm : FormGroup
  // instances : InstanceRowDto[];
  
  constructor(private formBuilder : FormBuilder, private projectService : ProjectService) {
    this.projectDetailsForm = this.formBuilder.group({
      title : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description : new FormControl('', [Validators.required, Validators.maxLength(250)])
    })
  }
  ngOnInit(): void {
    // this.instances = this.projectService.getProjectInstances()
  }
}
