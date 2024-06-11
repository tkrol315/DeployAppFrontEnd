import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstanceRowDto } from '../../../dto/instance.row.dto';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstanceDto } from '../../../dto/instance.dto';
import { InstanceService } from '../../../Services/instanceService/instance.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-create-instance-popup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [InstanceService],
  templateUrl: './create-instance-popup.component.html',
  styleUrl: './create-instance-popup.component.scss'
})
export class CreateInstancePopupComponent {
  instanceForm : FormGroup
  @Output() instanceAdded = new EventEmitter<InstanceDto>();

  constructor(
    private formBuilder : FormBuilder,
    private activeModal : NgbActiveModal,  
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
      // const instanceDto : InstanceDto = this.instanceForm.value;
      // this.route.params.pipe(switchMap((params) => this.instanceService.CreateInstance(params['id'],instanceDto)
      //   .subscribe(()=>{this.instanceAdded.emit(); this.activeModal.close();})));
    }
  }
  closePopup() : void {
    this.activeModal.close();
  }  
}
