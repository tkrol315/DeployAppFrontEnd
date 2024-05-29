import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';
import { DataService } from '../../Services/dataservice';

@Component({
  selector: 'app-data-grid-view',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxFilterComponent],
  templateUrl: './data-grid-view.component.html',
  styleUrl: './data-grid-view.component.scss'
})
export class DataGridViewComponent<T>  {

  @Input() data : any[] = [];
  @Input() columns: {header: string, type: string, filter: boolean}[] = [];
  values : {[key: string]:string} = {};
  filters: {[key: string]:string} = {};
  @Input() dataUrl : string = '';
  checkboxFilters : {[key : string]: string} = {}; 
  @Input() service! : DataService;

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
    const textFilters = this.getFilterValues();
    const mergedFilters = this.createMergedFilters(textFilters, this.checkboxFilters);
    console.log(mergedFilters);
    this.service.getDataWithFilters(mergedFilters).subscribe((resp : any) =>{
      this.data = resp;
    });

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

  //It should be refactored so it will work with above filter for now its ok
  checkboxFilterChanged(colHeader:string, state : any) : void{
    this.checkboxFilters[colHeader] = state;
    this.filter();
  }
}
