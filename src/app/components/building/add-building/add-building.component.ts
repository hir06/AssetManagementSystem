import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../../services/shared.service";
import { AlertsLoaderService } from "../../../services/alerts-loader.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "app-add-building",
    templateUrl: "./add-building.component.html",
    styleUrls: ["./add-building.component.scss"]
})
export class AddBuildingComponent implements OnInit {
    public building: any;
    public currentTab: any;
    public tabs: any;
    public editMode: boolean;
    public dropDownsData: any;
    public multiselectConfig: any = {
        search: false,
        displayKey: "description"
    };
    constructor(
        private _sharedService: SharedService,
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private route: ActivatedRoute
    ) {
        this.initBuilding();
        this.tabs = this._sharedService.getTabstoShow(this.building);
        this.currentTab = this.tabs[0];
        this.dropDownsData = this._sharedService.dropDownsData;
        this._sharedService.dropDownsService.subscribe(data => {
            this.dropDownsData = data;
        });
        
    }
    ngOnInit() {
        this.dropDownsData = this._sharedService.dropDownsData;
        this.route.params.subscribe((params: Params) => {
            let Id = params["id"];
            if (Id) {
                this.getBuildingById(Id);
                this.editMode = true;
            }
        });
    }

    selectCompareFunction(item1:any,item2:any) {
        if(item1 == null || item2 ==null){
            return false;
        }
        return item1.id == item2.id;
    }
    initBuilding(){
        this.building = {
            id: null,
            assets: null,
            statusFlag: null,
            buildingId: "",
            buildingDescription: null,
            buildingName: null,
            assetCategory: {
                id: "BUILDING"
            },
            addresses: [],
            organization: null,
            department: null,
            numberOfFloors: null,
            regulatoryCompliance: null,
            regulatoryAuthorityName: null,
            regCompObtainedDate: null,
            fireExits: null,
            fireExitsLoc: null,
            fireExtinguishers: null,
            fireExtinguisherLoc: null,
            fireExtinguisherTypes: [],
            amcPresent: "N",
            insurancePresent: "N",
            loanPresent: "N",
            licensePresent: "N",
            warrantyPresent: "N",
            inspectionPresent: "N",
            servicePresent: "N",
            rentOrLeasePresent:"N",
            assetCondition: null,
            assetStatus: null,
            assetType: null,
            notes: null,
            buildingSize: null,
            assetConditionOther: null,
            assetStatusOther: null,
            assetTypeOther: null,
            assignees: [],
            insurancePolicies: null,
            rentalOrLeaseAgreements: null,
            loanAgreements: null,
            annualMaintenanceContracts: null,
            licenses: null,
            warrantyAgreements: null,
            inspections: null,
            services: null,
            existingInsurancePolicies: null,
            existingRentalOrLeaseAgreements: null,
            existingLoanAgreements: null,
            existingAnnualMaintenanceContracts: null,
            existingLicenses: null,
            existingWarrantyAgreements: null,
            existingInspections: null,
            existingServices: null
        };
    }

    getBuildingById(buidingId: number) {
        this._apiService.get("/s/building/buildingId/" + buidingId).subscribe(
            data => {
                this.building = data;
                this.updateTabs();
            },
            error => {
                this._alertsService.error(
                    "Unable to get building details. Try Again."
                );
            }
        );
    }

    addedToAsset($event:any){
        this.building = $event;
    }

    changeTab(tab: string) {
        if (!this.building.id) {
            this._alertsService.error("Please save building details first.");
            return;
        }
        this.currentTab = tab;
    }

    updateTabs() {
        this.tabs = this._sharedService.getTabstoShow(this.building);
    }
    save() {
        this._apiService
            .createOrUpdateBuilding(
                "/s/building/create-or-update-building",
                this.building
            )
            .subscribe(
                data => {
                    this.building = data;
                    this._alertsService.success("Building successfully saved");
                    //this.initBuilding();
                },
                error => {
                    this._alertsService.error("Some error ocured. Try again");
                }
            );
    }
}
