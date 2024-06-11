import { Component, Input, TemplateRef, model } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataGridViewComponent } from '../data-grid-view/data-grid-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-btn',
  standalone: true,
  imports: [],
  templateUrl: './create-btn.component.html',
  styleUrl: './create-btn.component.scss'
})

export class CreateBtnComponent {
  @Input() text : string = '';
  @Input() dataGridViewComponent!: DataGridViewComponent;
  @Input() eventName!: string;
  @Input() popupComponent! : any;
  
constructor(
  private modalService: NgbModal,
  private route : ActivatedRoute
) {}

  openPopup() : void{
    const id  = this.route.snapshot.paramMap.get('id');
    const modalRef = this.modalService.open(this.popupComponent);
    modalRef.componentInstance.projectId = id;
    if (this.eventName && modalRef.componentInstance[this.eventName]) {
      modalRef.componentInstance[this.eventName]
      .subscribe(() => this.dataGridViewComponent.filter());
    } else {
      throw new Error(`Event ${this.eventName} does not exist on the modal component`);
    }
  }
}
