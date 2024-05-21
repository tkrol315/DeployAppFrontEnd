import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-filter.component.html',
  styleUrl: './checkbox-filter.component.scss'
})
export class CheckboxFilterComponent {

 state : string = 'nofilter';
 color : string = 'white';
 @Output() filterChanged = new EventEmitter<string>();

 clickHandler() : void{
  if(this.state === 'nofilter'){

    this.color = "greenyellow";
    this.state = "activeElements";
  }
  else if(this.state === "activeElements"){
    this.color = "red";
    this.state = "noActiveElements";
  }
  else if(this.state === "noActiveElements"){

    this.color = "white";
    this.state = "nofilter";
  }
  this.filterChanged.emit(this.state);
 }

}
