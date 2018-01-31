import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss']
})
export class SupportingDocumentsComponent implements OnInit {
  @Input() asset: any;
  files: any = [];
  @Input() docsObject: any;
  constructor() { }

  ngOnInit() {
  }
  
}
