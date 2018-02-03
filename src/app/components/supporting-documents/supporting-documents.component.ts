import { AlertsLoaderService } from './../../services/alerts-loader.service';
import { ApiService } from './../../services/api.services';
import { Component, OnInit, Input } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss']
})
export class SupportingDocumentsComponent implements OnInit {
  @Input() docsObject?: any;
  @Input() addTo: string;
  files: any = [];
  uploadUrl: string;
  fileDescription: string;
  formData: FormData = new FormData();

  constructor(private _apiService: ApiService, private _alertsService: AlertsLoaderService) {

  }

  ngOnInit() {
    this.uploadUrl = `/s/document/save-documents-for-${this.addTo}`;
  }

  documentSelected($event: any) {
    let addTo = this.addTo !== "rental-or-lease" ? this.addTo : "rentalOrLease";
    this.formData.append(`${addTo}Id`, this.docsObject.id);
    this.formData.append("file", $event.target.files[0]);
    this.formData.append("fileDescription", this.fileDescription);
  }
  addDocuments() {
    let headers: {
      'Content-Type': undefined
    }
    this._apiService.post(this.uploadUrl, this.formData, headers).subscribe(
      data => {
        this._alertsService.success("Documents successfully uploaded");
        this.docsObject.documents = data;
      },
      error => {
        this._alertsService.error("Some error occured while uploading documents.");
      }
    )
  }

  deleteDocument(doc: any, index: number) {
    this._apiService.delete(`/s/document/delete-document/${doc.id}`).subscribe(
      data => {
        this._alertsService.success("Document deleted successfully");
        this.docsObject.documents.splice(index, 1);
      },
      error => {
        this._alertsService.error("Some error occured while deleting document.");
      }
    )
  }

  downloadDocument(doc: any) {
    this._apiService.get(`/s/document/download-document/${doc.id}`,{},true,true).subscribe(
      data => {
        debugger
        this.saveFile(data, doc.originalFileName);
      },
      error => {
        this._alertsService.error("Some error occured while download document.");
        console.log(error);
      }
    )
  }

  saveFile(blobContent: any, fileName: string) {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }
}
