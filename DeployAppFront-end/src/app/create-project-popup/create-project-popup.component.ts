import { Component } from '@angular/core';
import { InputWithLabelComponent } from '../input-with-label/input-with-label.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project-pop-up',
  standalone: true,
  imports: [InputWithLabelComponent,ReactiveFormsModule],
  templateUrl: './create-project-popup.component.html',
  styleUrl: './create-project-popup.component.scss'
})
export class CreateProjectPopupComponent {
  
  constructor(private activeModal : NgbActiveModal){}
  projectForm = new FormGroup({
    title : new FormControl('', [Validators.required, Validators.max(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    isActive: new FormControl('',[Validators.required]),
    ytCode: new FormControl('',[Validators.required, Validators.maxLength(10)]),
    repositoryUrl: new FormControl('', [Validators.required, Validators.maxLength(250)])
  });;
  
  closePopup() : void{
    this.activeModal.close();
  }
  
 
  addProject() : void{

  }
}
