import { ApiService } from './../../../services/api.services';
import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../../services/shared.service";
import { last } from 'rxjs/operator/last';

@Component({
    selector: "app-add-building",
    templateUrl: "./add-building.component.html",
    styleUrls: ["./add-building.component.scss"]
})
export class AddBuildingComponent implements OnInit {
    public building: any = {};
    public currentTab: any;
    public tabs: any;
    public dropDownsData: any;
    public multiselectConfig:any ={
        search:false,
        displayKey:"description"
    }
    constructor(private _sharedService: SharedService,private _apiService: ApiService) {
        this.building={
            "id": null,
            "assets": null,
            "statusFlag": null,
            "buildingId": "",
            "buildingDescription": null,
            "buildingName": null,
            "assetCategory": {
              "id": "BUILDING"
            },
            "addresses": [
            ],
            "organization": null,
            "department": null,
            "numberOfFloors": null,
            "regulatoryCompliance": null,
            "regulatoryAuthorityName": null,
            "regCompObtainedDate": null,
            "fireExits": null,
            "fireExitsLoc": null,
            "fireExtinguishers": null,
            "fireExtinguisherLoc": null,
            "fireExtinguisherTypes": [
            ],
            "amcPresent": null,
            "insurancePresent": null,
            "loanPresent": null,
            "licensePresent": null,
            "warrantyPresent": null,
            "inspectionPresent": null,
            "servicePresent": null,
            "assetCondition": null,
            "assetStatus": null,
            "assetType": null,
            "notes": null,
            "buildingSize": null,
            "assetConditionOther": null,
            "assetStatusOther": null,
            "assetTypeOther": null,
            "assignees": [
            ],
            "insurancePolicies": null,
            "rentalOrLeaseAgreements": null,
            "loanAgreements": null,
            "annualMaintenanceContracts": null,
            "licenses": null,
            "warrantyAgreements": null,
            "inspections": null,
            "services": null,
            "existingInsurancePolicies": null,
            "existingRentalOrLeaseAgreements": null,
            "existingLoanAgreements": null,
            "existingAnnualMaintenanceContracts": null,
            "existingLicenses": null,
            "existingWarrantyAgreements": null,
            "existingInspections": null,
            "existingServices": null
        }
        this.tabs = this._sharedService.getTabstoShow(this.building);
        this.currentTab = this.tabs[0];
     
        this._sharedService.dropDownsService.subscribe((data)=>{
            this.dropDownsData = data;
        });
    }
    ngOnInit() {
        this.dropDownsData = this._sharedService.dropDownsData;

    }
    changeTab(tab: string) {
        this.currentTab = tab;
    }

    updateTabs(){
        this.tabs = this._sharedService.getTabstoShow(this.building);
    }
    save(){
        this._apiService.createOrUpdateBuilding("/s/building/create-or-update-building",this.building)
        .subscribe(
            (data)=>{
                this.building = data;
            },
            (error)=>{
                alert("Error");
            }
        )
    }
}
