import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-add-other-assets",
    templateUrl: "./add-other-assets.component.html",
    styleUrls: ["./add-other-assets.component.scss"]
})
export class AddOtherAssetsComponent implements OnInit {
    asset: any = {};
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
