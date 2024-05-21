import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';

@Component({
  selector: 'app-data-grid-view',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxFilterComponent],
  templateUrl: './data-grid-view.component.html',
  styleUrl: './data-grid-view.component.scss'
})
export class DataGridViewComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.visibleData = this.data;
  }

  @Input() data : any[] = [];
  @Input() columns: {header: string, type: string, filter: boolean}[] = [];
  values : {[key: string]:string} = {};
  filters: {[key: string]:string} = {};

  visibleData : any[] = [];
  visibleColumns : {header: string, type: string, filter: boolean}[] = [];

  ngOnInit(): void{
    this.visibleData = this.data.slice();
    this.visibleColumns = this.columns.slice();
  }

  filter(colHeader : string) : void{
    console.clear();
    const column = this.columns.find(col => col.header === colHeader);
    if (!column)
      return; 
    const ch = column.header;  
    this.data.forEach(row => {
      if (row[ch] !== undefined) {
        this.visibleData = this.data.filter(row => 
          this.columns.every(column => {
            const filterValue = this.values[column.header];
            return !filterValue || row[column.header].toString().toLowerCase().includes(filterValue.toLowerCase());
          })
        );
      }
    });
  } 

  //It should be refactored so it will work with above filter for now its ok
  checkboxFilter(state : any){
    this.visibleData = [];
    if(state === "nofilter"){
      this.visibleData = this.data.slice();
      return;
    }
    this.data.forEach(row => {
      this.columns.forEach(col =>{
        if(col.type === "checkbox"){
            if(state === "activeElements" && row[col.header]){
              this.visibleData.push(row);
            }
            else if(state === "noActiveElements" && !row[col.header]){
              this.visibleData.push(row);
            }
        }
      })
    })
  }
}
