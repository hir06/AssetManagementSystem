import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.services';

@Component({
    selector: "app-add-vehicle",
    templateUrl: "./add-vehicle.component.html",
    styleUrls: ["./add-vehicle.component.scss"]
})
export class AddVehicleComponent implements OnInit {
    vehicle: any = {
        "id": null,
        "assets": null,
        "statusFlag": null,
        "vehicleRegistrationId": null,
        "engineNumber": null,
        "chasisNumber": null,
        "make": null,
        "model": null,
        "commentDescription": null,
        "vehicleDamageTypes": [],
        "assetCategory": {
          "id": "VEHICLE"
        },
        "addresses": [],
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
        "existingServices": null,
        "assignees": null,
        "vehicleDamageTypeOther": null,
        "assetCondition": {
          "id": null
        },
        "assetStatus": {
          "id": null
        },
        "assetType": {
          "id": null
        },
        "assetConditionOther": null,
        "assetStatusOther": null,
        "assetTypeOther": null,
        "yearOfManufacturing": null,
        "monthOfManufacturing": {
          "id": null
        },
        "motApplicable": null,
        "motStartDateTime": null,
        "motEndDateTime": null,
        "motObtainedDate": null,
        "motAuthorityName": null,
        "motPlace": null,
        "taxApplicable": null,
        "taxStartDateTime": null,
        "taxEndDateTime": null,
        "taxAmount": null,
        "vehicleType": {
          "id": null
        },
        "vehicleTypeOther": null,
        "organization": {
          "id": null
        },
        "department": {
          "id": null
        },
        "regulatoryCompliance": null,
        "regulatoryAuthorityName": null,
        "regCompObtainedDate": null,
        "fireExits": null,
        "fireExitsLoc": null,
        "fireExtinguishers": null,
        "fireExtinguisherLoc": null,
        "amcPresent": "N",
        "insurancePresent": "N",
        "loanPresent": "N",
        "licensePresent": "N",
        "warrantyPresent": "N",
        "inspectionPresent": "N",
        "servicePresent": "N",
        "fireExtinguisherTypes": []
      };
    public currentTab: any;
    public tabs: any;
    public dropDownsData: any;
    constructor(private _sharedService: SharedService,private _apiService: ApiService) {
        this.tabs = this._sharedService.getTabstoShow(this.vehicle);
        this.currentTab = this.tabs[0];
        this._sharedService.dropDownsService.subscribe((data)=>{
            this.dropDownsData = data;
        });
    }
    ngOnInit() {}
    changeTab(tab:string){
      this.currentTab = tab;
    }
    updateTabs(){
        this.tabs = this._sharedService.getTabstoShow(this.vehicle);
    }

    save(){
        this._apiService.createOrUpdateVehicle("/s/vehicle/create-or-update-vehicle",this.vehicle)
        .subscribe(
            (data)=>{
                this.vehicle = data;
            },
            (error)=>{
                alert("Error");
            }
        )
    }
}
