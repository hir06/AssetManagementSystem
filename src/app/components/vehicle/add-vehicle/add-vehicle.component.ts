import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-add-vehicle",
    templateUrl: "./add-vehicle.component.html",
    styleUrls: ["./add-vehicle.component.scss"]
})
export class AddVehicleComponent implements OnInit {
    vehicle: any = {};
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
