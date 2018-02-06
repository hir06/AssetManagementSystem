import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../services/api.services";

@Component({
    selector: "app-license",
    templateUrl: "./license.component.html",
    styleUrls: ["./license.component.scss"]
})
export class LicenseComponent implements OnInit {
    license: any;
    @Input() asset: any;
    editMode: boolean = false;
    constructor(
        private _alertsService: AlertsLoaderService,
        private _apiService: ApiService
    ) {
        this.initLicense();
    }

    ngOnInit() {
        
    }
    initLicense(){
        this.license =  {
            id: null,
            statusFlag: null,
            licenseNumber: null,
            licenseHolderName: null,
            licenseHoldingCompany: null,
            licenseHolderDescription: null,
            licenseHolderPhone: null,
            licenseHolderEmail: null,
            licenseProvidedBy: null,
            licenseProvidingAuthority: null,
            licenseProviderDescription: null,
            licenseProviderPhone: null,
            licenseProviderEmail: null,
            placeIssued: null,
            issuedDate: null,
            startDateTime: null,
            endDateTime: null,
            graceDateTime: null,
            renewalDate: null,
            gracePeriodInMonths: null,
            licenseAmount: null,
            renewalAmount: null,
            comments: null
        };
    }
    save() {
        if (this.editMode) {
            this.updateLicense();
            return;
        }
        let url = "/s/building/add-license-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/s/asset-type-other/add-license-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-license-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/s/vehicle/add-license-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.license).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "License successfully added to " +
                        this.asset.assetCategory.description
                );
                this.initLicense();
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }

    editLicense(license: any) {
        this.license = license;
        this.editMode = true;
    }
    updateLicense() {
        this._apiService
            .put("/s/license/update-license", this.license)
            .subscribe(
                data => {
                    this.license = data;
                    this._alertsService.success(
                        "License successfully updated."
                    );
                },
                error => {
                    this._alertsService.error(
                        "Some error occured. Please try again."
                    );
                }
            );
    }
    removeLicenseFromAsset(license: any) {
        let url = `/s/building/remove-license-from-building/buildingId/${
            this.asset.id
        }/licenseId/${license.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/s/vehicle/remove-license-from-vehicle/vehicleId/${
                this.asset.id
            }/licenseId/${license.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/s/equipment/remove-license-from-equipment/equipmentId/${
                this.asset.id
            }/licenseId/${license.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = `/s/asset-type-other/remove-license-from-asset-type-other/assetTypeOtherId/${
                this.asset.id
            }/licenseId/${license.id}`;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "License successfully removed from " +
                        this.asset.assetCategory.description
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
