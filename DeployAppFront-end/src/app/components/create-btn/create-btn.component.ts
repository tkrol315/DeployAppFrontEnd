import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-btn',
  standalone: true,
  imports: [],
  templateUrl: './create-btn.component.html',
  styleUrl: './create-btn.component.scss'
})

export class CreateBtnComponent {
  @Input() text : string = '';
  @Output() clickedBtn =  new EventEmitter();

  clicked() : void{
    this.clickedBtn.emit();
  }
}
