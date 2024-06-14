import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstanceDto } from '../../../shared/dto/instance.dto';
import { InstanceService } from '../../../Services/instanceService/instance.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-instance-popup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [InstanceService],
  templateUrl: './create-instance-popup.component.html',
})
export class CreateInstancePopupComponent {
  instanceForm : FormGroup
  @Output() created = new EventEmitter<InstanceDto>();
  projectId! : string; 

  constructor(
    private formBuilder : FormBuilder,
    private activeModal : NgbActiveModal,  
    private instanceService : InstanceService
  ){
    this.instanceForm = formBuilder.group({
      name: new FormControl('',[Validators.required, Validators.maxLength(100)]),
      typeDescription: new FormControl('',[Validators.required,Validators.maxLength(250)]),
      secret: new FormControl('',[Validators.required]),
      key: new FormControl('',[Validators.required]),
      versionString: new FormControl(''),
      versionDescription: new FormControl('')
    });
    
  }

  addInstance() : void {
    if(this.instanceForm.valid){
      const instanceDto : InstanceDto = this.instanceForm.value;
      this.instanceService.CreateInstance(this.projectId, instanceDto)
      .subscribe( ()=>{
          this.created.emit();
          this.activeModal.close();
      });
    }
  }
  closePopup() : void {
    this.activeModal.close();
  }  
}
