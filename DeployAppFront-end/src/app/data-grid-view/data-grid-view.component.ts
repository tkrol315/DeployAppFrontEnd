import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-grid-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-grid-view.component.html',
  styleUrl: './data-grid-view.component.scss'
})
export class DataGridViewComponent {
  @Input() data : any[] = [];
  @Input() columns: {field: string, header: string, type: string, filter: boolean}[] = [];
  values : {[key: string]:string} = {};
  filters: {[key: string]:string} = {};

  visibleData : any[] = [];
  visibleColumns : {field: string, header: string, type: string, filter: boolean}[] = [];

  ngOnInit(): void{
    this.visibleData = this.data.slice();
    this.visibleColumns = this.columns.slice();
  }

  filter(colHeader : string) : void{
    console.clear();
    const column = this.columns.find(col => col.header === colHeader);
    if (!column)
      return; 
    const fieldName = column.field;  
    this.data.forEach(row => {
      if (row[fieldName] !== undefined) {
        this.visibleData = this.data.filter(row => 
          this.columns.every(column => {
            const filterValue = this.values[column.header];
            return !filterValue || row[column.field].toString().toLowerCase().includes(filterValue.toLowerCase());
          })
        );
      }
    });
    
  } 
}
