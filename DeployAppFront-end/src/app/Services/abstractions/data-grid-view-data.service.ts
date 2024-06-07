import { Observable } from "rxjs";
import { ProjectRowDto } from "../../dto/project.row.dto";

export interface DataGridViewDataService{
    getDataWithFilters(filters: {[key:string] : any}) : Observable<any[]>;
    mapDataToRows(response : any) : any[];
    removeClickedItem(id : number) : Observable<any>;
}