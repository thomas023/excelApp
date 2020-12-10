import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edit-table';
  i = 0;
  editId: string | null = null;
  listOfData: any;
  file: File;
  buffer: any;
  worksheet: any;
  excelData: any[];
  tableData: any;
  uploadFile(event) {
    this.file = event.target.files[0];
  }
  submitted: boolean = false;
  
  // function to read data from excel
  upload() {
    this.submitted = true;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.buffer = fileReader.result;
      var data = new Uint8Array(this.buffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name]; // worksheet_name
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      console.log(this.excelData)
      // this.tableData = this.excelData.map(data => Object.values(data)); 
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.tableData = [   
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.tableData = this.tableData.filter(d => d.id !== id);
  }
}
