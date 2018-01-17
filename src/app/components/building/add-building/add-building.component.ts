import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../../services/shared.service";

@Component({
    selector: "app-add-building",
    templateUrl: "./add-building.component.html",
    styleUrls: ["./add-building.component.scss"]
})
export class AddBuildingComponent implements OnInit {
    public building: any = {};
    public currentTab: any;
    public tabs: any;
    constructor(private _sharedService: SharedService) {
        this.tabs = this._sharedService.tabs;
        this.currentTab = this.tabs[0];
    }
    ngOnInit() {}
    changeTab(tab: string) {
        this.currentTab = tab;
    }
}
