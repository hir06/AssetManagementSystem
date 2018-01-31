import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../services/api.services";

@Component({
    selector: "app-loan",
    templateUrl: "./loan.component.html",
    styleUrls: ["./loan.component.scss"]
})
export class LoanComponent implements OnInit {
    loan: any = {
        id: null,
        statusFlag: null,
        agreementId: null,
        agreementName: null,
        agreementDescription:
        null,
        companyName: null,
        companyDescription: null,
        companyPhone: null,
        companyEmail: null,
        companyContactPerson: null,
        startDateTime: null,
        endDateTime: null,
        graceDateTime: null,
        loanAmount: null,
        loanEmi: null,
        gracePeriodInMonths: null,
        comments: null,
        interestPercentage: null,
        buildings: null,
        equipments: null,
        vehicles: null,
        assetTypeOthers: null,
        existingBuildings: null,
        existingEquipments: null,
        existingVehicles: null,
        existingAssetTypeOthers: null
    };
    @Input() asset: any;
    editMode: boolean=false;
    constructor(
        private _alertsService: AlertsLoaderService,
        private _apiService: ApiService
    ) {}

    ngOnInit() {}

    save() {
        if(this.editMode){
            this.updateLoan();
            return;
        }
        let url = "/s/building/add-loan-to-building/buildingId/";
        if (this.asset.assetCategory.id == "OTHER") {
            url =
                "/s/asset-type-other/add-loan-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-loan-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/s/vehicle/add-loan-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.loan).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Service successfully added to " +
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

    editLoan(loan: any){
        this.loan = loan;
    }
    updateLoan(){
        this._apiService.put("/s/loan/update-loan",this.loan).subscribe(
            data => {
                this.loan = data;
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
    removeLoanFromAsset(loan: any){
        let url = `/s/building/remove-loan-from-building/buildingId/${this.asset.id}/loanId/${loan.id}`;
    if (this.asset.assetCategory.id == "VEHICLE") {
        url = `/s/vehicle/remove-loan-from-vehicle/vehicleId/${this.asset.id}/loanId/${loan.id}`;
    }
    if (this.asset.assetCategory.id == "EQUIPMENT") {
        url = `/s/equipment/remove-loan-from-equipment/equipmentId/${this.asset.id}/loanId/${loan.id}`;
    }
    if (this.asset.assetCategory.id == "OTHER") {
        url =  `/s/asset-type-other/remove-loan-from-asset-type-other/assetTypeOtherId/${this.asset.id}/loanId/${loan.id}`;;
    }
    this._apiService.delete(url).subscribe(
        data => {
            this.asset = data;
            this._alertsService.success(
                "Loan successfully removed from " +this.asset.assetCategory.description
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
