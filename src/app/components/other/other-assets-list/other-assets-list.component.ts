import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-assets-list',
  templateUrl: './other-assets-list.component.html',
  styleUrls: ['./other-assets-list.component.scss']
})
export class OtherAssetsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getPageData($event:any){
    console.log($event);
  }
}
