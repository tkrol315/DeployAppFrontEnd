import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../Services/projectService/project.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDto } from '../../../shared/dto/project.dto';

@Component({
  selector: 'app-create-project-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [ProjectService],
  templateUrl: './create-project-popup.component.html',
})
export class CreateProjectPopupComponent {
  
  projectForm : FormGroup;
  @Output() created = new EventEmitter<void>();

  constructor(
    private activeModal : NgbActiveModal,
    private formBuilder : FormBuilder,
    private projectService: ProjectService
    )
    {
    this.projectForm = this.formBuilder.group({
      title : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      isActive: new FormControl(false,[Validators.required]),
      ytCode: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      repositoryUrl: new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
  }

  closePopup() : void{
    this.activeModal.close();
  }
 
  createProject() : void{
    if(this.projectForm.valid){
      const projectDto: ProjectDto = this.projectForm.value;
       this.projectService.createNewProject(projectDto).subscribe(project => {
        this.created.emit(); 
        this.activeModal.close();
      });
    }
  }
}
