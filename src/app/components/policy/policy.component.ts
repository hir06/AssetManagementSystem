import { ApiService } from "./../../services/api.services";
import { Component, OnInit, Input } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";
import { SharedService } from "../../services/shared.service";

@Component({
    selector: "app-policy",
    templateUrl: "./policy.component.html",
    styleUrls: ["./policy.component.scss"]
})
export class PolicyComponent implements OnInit {
    policy: any ;
    dropDownsData: any;
    @Input() asset: any;
    editMode: boolean =false;
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private _sharedService: SharedService
    ) {
        this.dropDownsData = this._sharedService.dropDownsData;
        this._sharedService.dropDownsService.subscribe(data => {
            this.dropDownsData = data;
        });
        this.initPolicy();
    }

    ngOnInit() {}
    initPolicy(){
        this.policy = {
            id: null,
            statusFlag: null,
            policyNumber: null,
            policyName: null,
            policyDescription: null,
            policyStartDateTime: null,
            policyEndDateTime: null,
            graceDateTime: null,
            gracePeriodInMonths: null,
            policyCoverAmount: null,
            policyPremiumAmount: null,
            policyType: {
                id: null,
                description: null
            },
            policyRenewalType: {
                id: null,
                description: null
            },
            providerName: null,
            providerDescription: null,
            providerPhone: null,
            providerEmail: null,
            providerContactPerson: null,
            comments: null,
            policyTypeOther: null,
            policyRenewalTypeOther: null,
            buildings: null,
            equipments: null,
            vehicles: null,
            assetTypeOthers: null,
            existingBuildings: null,
            existingEquipments: null,
            existingVehicles: null,
            existingAssetTypeOthers: null
        };
    }
    save() {
        if(this.editMode){
            this.updatePolicy();
            return;
        }
        let url = "/s/building/add-policy-to-building/buildingId/";
        if (this.asset.assetCategory.id == "OTHER") {
            url =
                "/s/asset-type-other/add-policy-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-policy-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/s/vehicle/add-policy-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.policy).subscribe(
            (data) => {
                this.asset = data;
                this._alertsService.success(
                    "Policy successfully added to" + this.asset.assetCategory.description
                );
                this.initPolicy();
            },
            (error) => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }

    editPolicy(policy:any){
        this.policy = policy;
        this.editMode = true;
    }

    updatePolicy(){
        this._apiService.put("/s/policy/update-policy",this.policy).subscribe(
            data => {
                this.policy = data;
                this._alertsService.success(
                    "Policy successfully updated."
                );
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removePolicyFromAsset(policy: any){
        let url = `/s/building/remove-policy-from-building/buildingId/${this.asset.id}/policyId/${policy.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/s/vehicle/remove-policy-from-vehicle/vehicleId/${this.asset.id}/policyId/${policy.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/s/equipment/remove-policy-from-equipment/equipmentId/${this.asset.id}/policyId/${policy.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url =  `/s/asset-type-other/remove-policy-from-asset-type-other/assetTypeOtherId/${this.asset.id}/policyId/${policy.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Rental or Lease successfully removed from " +this.asset.assetCategory.description
                );
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
}
