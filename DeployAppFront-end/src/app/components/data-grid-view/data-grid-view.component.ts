import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';
import { Router } from '@angular/router';
import { DataGridViewDataService } from '../../Services/abstractions/data-grid-view-data.service';

@Component({
  selector: 'app-data-grid-view',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxFilterComponent],
  templateUrl: './data-grid-view.component.html',
  styleUrl: './data-grid-view.component.scss'
})
export class DataGridViewComponent implements OnInit   {

  @Input() data : any[] = [];
  @Input() columns: {name:string, header: string, type: string, filter: boolean, visible : boolean}[] = [];
  @Input() dataUrl : string = '';
  @Input() service! : DataGridViewDataService;
  filters : {[key : string] : any} = {};

  constructor(private router : Router) {  }

  ngOnInit(): void {
    this.columns.forEach(col => {
      if (col.filter) {
        this.filters[col.name] = '';
      }
    });
    this.filter();
  }

  getCheckboxFilterValues(): void {
    this.columns.forEach(col => {
      if (col.filter && col.type === 'checkbox') {
          switch (this.filters[col.name]) {
            case 'activeElements':
              this.filters[col.name] = true;
              break;
            case 'noActiveElements':
              this.filters[col.name] = false;
              break;
            case 'nofilter':  
            default:
              this.filters[col.name] = null;
              break;
          }
      }
    });
  }

  filter() : void{
    this.data = [];
    this.getCheckboxFilterValues();
    this.service.getDataWithFilters(this.filters).subscribe({
      next: (response : any) =>{
        this.data = this.service.mapDataToRows(response);
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  } 

  checkboxFilterStatusChanged(colName:string, state : string) : void{
    this.filters[colName] = state;
    this.filter();
  }

  removeElement(e : Event, id : number) : void{
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      this.service.removeClickedItem(id).subscribe(() => this.filter());
    } 
   }

  goToDetails(e : Event, id : number) : void{
    e.preventDefault();
    this.router.navigate([this.dataUrl, id]);
  }
}
