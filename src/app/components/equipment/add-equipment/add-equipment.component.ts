import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {
  equipment: any = {};
  public currentTab: any;
  public tabs: any;
    constructor(private _sharedService: SharedService) {
        this.tabs = this._sharedService.tabs;
        this.currentTab = this.tabs[0];
    }
  ngOnInit() {}
  changeTab(tab:string){
    this.currentTab = tab;
  }
}
