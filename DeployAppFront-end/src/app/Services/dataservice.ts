import { Observable } from "rxjs";
import { ProjectRowDto } from "../dto/project.row.dto";

export interface DataService{
    getDataWithFilters(filters: {[key:string] : any}) : Observable<any[]>;
    mapDataToRows(response : any) : ProjectRowDto[];
    removeClickedItem(id : number) : Observable<any>;
}