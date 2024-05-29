import { Observable } from "rxjs";

export interface DataService{
    getDataWithFilters(filters: {[key:string] : any}) : Observable<any[]>;
}