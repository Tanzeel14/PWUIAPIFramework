import XLSX from 'xlsx'

export class excelHelper{
    static readExcel(filePath:string,sheetName?:string):Record<string,string>[]{
        const workbook= XLSX.readFile(filePath); // go to entire excel
       const sheet= workbook.Sheets[sheetName||workbook.SheetNames[0]];// go to particular sheet
        return XLSX.utils.sheet_to_json<Record<string,string>>(sheet);
        
    }
}

//to use excel run npm install xlsx