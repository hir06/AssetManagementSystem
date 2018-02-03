import { AlertsLoaderService } from './../../services/alerts-loader.service';
import { ApiService } from './../../services/api.services';
import { Component, OnInit, Input } from '@angular/core';

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
    this.formData.append(`${this.addTo}Id`, this.docsObject.id);
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

}
