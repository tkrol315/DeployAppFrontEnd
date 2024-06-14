import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { CheckboxFilterState } from '../../../shared/enums/checkbox-filter-state';

@Component({
  selector: 'app-checkbox-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-filter.component.html',
})
export class CheckboxFilterComponent {

 state : CheckboxFilterState = CheckboxFilterState.NoFilter;
 color : string = 'white';
 @Output() filterChanged = new EventEmitter<CheckboxFilterState>();

 clickHandler() : void{
  if(this.state === CheckboxFilterState.NoFilter){

    this.color = "greenyellow";
    this.state = CheckboxFilterState.ActiveElements;
  }
  else if(this.state === CheckboxFilterState.ActiveElements){
    this.color = "red";
    this.state = CheckboxFilterState.NoActiveElements;
  }
  else if(this.state === CheckboxFilterState.NoActiveElements){

    this.color = "white";
    this.state = CheckboxFilterState.NoFilter;
  }
  this.filterChanged.emit(this.state);
 }

}
