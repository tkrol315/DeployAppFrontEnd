import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';
import { Router } from '@angular/router';
import { DataGridViewDataService } from '../../Services/abstractions/data-grid-view-data.service';

@Component({
  selector: 'app-data-grid-view',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxFilterComponent],
  templateUrl: './data-grid-view.component.html',
  styleUrl: './data-grid-view.component.scss'
})
export class DataGridViewComponent    {

  @Input() data : any[] = [];
  @Input() columns: {columnName:string, header: string, type: string, filter: boolean, visible : boolean}[] = [];
  @Input() dataUrl : string = '';
  @Input() service! : DataGridViewDataService;
  values : {[key: string]:string} = {};
  filters: {[key: string]:string} = {};
  checkboxFilters : {[key : string]: string} = {}; 
  apiCallEnable : boolean = true;

  constructor(private router : Router) {  }

  getFilterValues(): { [key: string]: string } {
    const filterValues: { [key: string]: string } = {};
    this.columns.forEach(col => {
      if (col.filter) {
        if(col.type === 'text'){
          filterValues[col.header] = this.values[col.header] === undefined ? '' : this.values[col.header];
        }
      }
    });
    
    return filterValues;
  }

  filter() : void{
    if(!this.apiCallEnable)
      return;
    this.apiCallEnable = false;
    this.data = [];
    const textFilters = this.getFilterValues();
    const mergedFilters = this.createMergedFilters(textFilters, this.checkboxFilters);
    this.service.getDataWithFilters(mergedFilters).subscribe((response : any) =>{
      this.data = this.service.mapDataToRows(response);
    });
    setTimeout(()=>{this.apiCallEnable = true; },200)
  } 

  createMergedFilters(filterValues: { [key: string]: string }, checkboxFilters: { [key: string]: string }): { [key: string]: any } {
    const mergedFilters: { [key: string]: any } = { ...filterValues };

    for (const key in checkboxFilters) {
      if (checkboxFilters.hasOwnProperty(key)) {
        switch (checkboxFilters[key]) {
          case 'activeElements':
            mergedFilters[key] = true;
            break;
          case 'noActiveElements':
            mergedFilters[key] = false;
            break;
          case 'nofilter':
          default:
            mergedFilters[key] = null;
            break;
        }
      }
    }
    return mergedFilters;
  }

  removeElement(e : Event, id : number) : void{
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      this.service.removeClickedItem(id).subscribe(() => this.filter());
    } 
   }

  checkboxFilterChanged(colHeader:string, state : any) : void{
    this.checkboxFilters[colHeader] = state;
    this.filter();
  }

  goToDetails(e : Event, id : number) : void{
    e.preventDefault();
    console.log(id);
    this.router.navigate([this.dataUrl, id]);
  }
}
