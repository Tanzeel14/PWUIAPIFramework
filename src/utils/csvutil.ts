import fs from "fs";
import {parse} from 'csv-parse/sync'

export class csvUtil{

    static readCsv(filePath:string):Record<string,string>[] // first string= type of column, second string= type of data
    {
       return parse(fs.readFileSync(filePath,"utf-8"),{
            columns:true, //first row consider as header
            skipEmptyLines:true,
            trim:true, //trim spaces

        }) as Record<string,string>[];
    }
}

