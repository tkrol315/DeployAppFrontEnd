import { ColumnType } from "../enums/column-type";

export class DataGridViewColumnDto{
    name! : string;
    header! : string;
    type! : ColumnType;
    filter! : boolean;
    visible! : boolean;
}
