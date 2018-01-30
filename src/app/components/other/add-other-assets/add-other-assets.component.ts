import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.services';
import { AlertsLoaderService } from '../../../services/alerts-loader.service';

@Component({
    selector: "app-add-other-assets",
    templateUrl: "./add-other-assets.component.html",
    styleUrls: ["./add-other-assets.component.scss"]
})
export class AddOtherAssetsComponent implements OnInit {
    asset: any = {
        "id": null,
        "assets": null,
        "statusFlag": null,
        "assetTypeOtherId": null,
        "assetTypeOtherDescription": null,
        "assetTypeOtherName": null,
        "assetCategory": {
          "id": "OTHER"
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
        "assetTag": null,
        "assetCost": null,
        "assetLength": null,
        "assetWidth": null,
        "assetHeight": null,
        "assetWeight": null,
        "assetQuantity": null,
        "assetMake": null,
        "assetModel": null,
        "assetSerialNumber": null,
        "assetDamageDescription": null,
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
        "purchasedDate": null,
        "purchasedFrom": null,
        "purchaseCompanyPhone": null,
        "purchaseCompanyEmail": null,
        "purchaseCompanyContactPerson": null,
        "purchaseComments": null,
        "orderNumber": null,
        "invoiceNumber": null,
        "assetReturned": null,
        "assetReturnedDate": null,
        "refundAmount": null,
        "assetReturnReason": null,
        "regulatoryCompliance": null,
        "regulatoryAuthorityName": null,
        "regCompObtainedDate": null,
        "organization": {
          "id": null
        },
        "department": {
          "id": null
        },
        "amcPresent": "N",
        "insurancePresent": "N",
        "loanPresent": "N",
        "licensePresent": "N",
        "warrantyPresent": "N",
        "inspectionPresent": "N",
        "servicePresent": "N",
        "fireExtinguishers": null,
        "fireExits": null,
        "fireExitsLoc": null,
        "fireExtinguisherLoc": null,
        "fireExtinguisherTypes": []
      };
    public currentTab: any;
    public tabs: any;
    public dropDownsData: any;
    constructor(private _sharedService: SharedService,private _apiService: ApiService,private _alertsService: AlertsLoaderService) {
        this.tabs =  this._sharedService.getTabstoShow(this.asset);;
        this.currentTab = this.tabs[0];
        this._sharedService.dropDownsService.subscribe((data)=>{
            this.dropDownsData = data;
        });
    }
    ngOnInit() {}
    changeTab(tab:string){
        if(!this.asset.id){
            this._alertsService.error("Please save building details first.");
            return;
        }
        this.currentTab = tab;
    }
    updateTabs(){
        this.tabs = this._sharedService.getTabstoShow(this.asset);
    }

    save(){
        this._apiService.createOrUpdateOtherAsset("/s/asset-type-other/create-or-update-asset-type-other",this.asset)
        .subscribe(
            (data)=>{
                this.asset = data;
                this._alertsService.success("Asset details saved successfully.");
            },
            (error)=>{
                this._alertsService.error("Some error occured while saving asset details.");
            }
        )
    }
}
