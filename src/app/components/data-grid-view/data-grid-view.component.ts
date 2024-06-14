import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';
import { Router } from '@angular/router';
import { DataGridViewColumnDto } from '../../shared/dto/data-grid-view-column.dto';
import { ColumnType } from '../../shared/enums/column-type';
import { CheckboxFilterState } from '../../shared/enums/checkbox-filter-state';
import { DataGridViewService } from '../../Services/abstractions/data-grid-view-service';

@Component({
  selector: 'app-data-grid-view',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxFilterComponent],
  templateUrl: './data-grid-view.component.html',
})
export class DataGridViewComponent implements OnInit   {

  @Input() data : any[] = [];
  @Input() columns: DataGridViewColumnDto[] = [];
  @Input() detailsUrl! : string;
  @Output() filterApplied = new EventEmitter<{ [key: string]: any }>();
  @Output() deleteConfirmed = new EventEmitter<string>();
  filters : {[key : string] : any} = {};
  //expose ColumnType to html template
  ColumnType = ColumnType;

  constructor(private router : Router) {  }

  ngOnInit(): void {
    this.columns.forEach(col => {
      if (col.filter) {
        this.filters[col.name] = '';
      }
    });
  }

  private getCheckboxFilterValues(): void {
    this.columns.forEach(col => {
      if (col.filter && col.type === ColumnType.Checkbox) {
          switch (this.filters[col.name]) {
            case CheckboxFilterState.ActiveElements:
              this.filters[col.name] = true;
              break;
            case CheckboxFilterState.NoActiveElements:
              this.filters[col.name] = false;
              break;
            case CheckboxFilterState.NoFilter:  
            default:
              this.filters[col.name] = null;
              break;
          }
      }
    });
  }

  applyFilter() : void{
    this.getCheckboxFilterValues();
    this.filterApplied.emit(this.filters);
  } 

  checkboxFilterStatusChanged(colName:string, state : CheckboxFilterState) : void{
    this.filters[colName] = state;
    this.applyFilter();
  }

  removeElement(e : Event, id : string) : void{
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      this.deleteConfirmed.emit(id);
    } 
   }

  goToDetails(e : Event, id : string) : void{
    e.preventDefault();
    this.router.navigate([this.detailsUrl, id]);
  }
}
