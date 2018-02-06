import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { ApiService } from "./../../../services/api.services";
import { SharedService } from "./../../../services/shared.service";
import { Component, OnInit } from "@angular/core";
import { AlertsLoaderService } from "../../../services/alerts-loader.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "app-add-equipment",
    templateUrl: "./add-equipment.component.html",
    styleUrls: ["./add-equipment.component.scss"]
})
export class AddEquipmentComponent implements OnInit {
    equipment: any ;
    public currentTab: any;
    public tabs: any;
    public dropDownsData: any = {};
    constructor(
        private _sharedService: SharedService,
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private route: ActivatedRoute
    ) {
        this.initEquipment();
        this.tabs = this._sharedService.getTabstoShow(this.equipment);
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
                this.getEquipmentById(Id);
            }
        });
    }

    initEquipment(){
        this.equipment = {
            id: null,
            assets: null,
            statusFlag: null,
            equipmentId: null,
            equipmentDetails: null,
            serialNumber: null,
            assetCategory: {
                id: "EQUIPMENT"
            },
            addresses: [],
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
            existingServices: null,
            assignees: null,
            equipmentName: null,
            equipmentTag: null,
            equipmentCost: null,
            equipmentLength: null,
            equipmentWidth: null,
            equipmentHeight: null,
            equipmentWeight: null,
            equipmentQuantity: null,
            equipmentMake: null,
            equipmentModel: null,
            assetCondition: {
                id: null
            },
            assetStatus: {
                id: null
            },
            assetType: {
                id: null
            },
            assetConditionOther: null,
            assetStatusOther: null,
            assetTypeOther: null,
            equipmentPurchasedDate: null,
            equipmentPurchasedFrom: null,
            equipmentCompanyPhone: null,
            equipmentCompanyEmail: null,
            equipmentCompanyContactPerson: null,
            equipmentCompanyComments: null,
            orderNumber: null,
            invoiceNumber: null,
            equipmentDamageDesc: null,
            equipmentReturnedDate: null,
            refundAmount: null,
            equipmentReturned: null,
            equipmentReturnedReason: null,
            organization: {
                id: null
            },
            department: {
                id: null
            },
            regulatoryCompliance: null,
            regulatoryAuthorityName: null,
            regCompObtainedDate: null,
            fireExtinguishers: null,
            fireExits: null,
            amcPresent: "N",
            insurancePresent: "N",
            loanPresent: "N",
            licensePresent: "N",
            warrantyPresent: "N",
            inspectionPresent: "N",
            servicePresent: "N",
            fireExitsLoc: null,
            fireExtinguisherLoc: null,
            fireExtinguisherTypes: []
        };
    }
    changeTab(tab: string) {
        if (!this.equipment.id) {
            this._alertsService.error("Please save equipment details first.");
            return;
        }
        this.currentTab = tab;
    }
    getEquipmentById(id: number) {
        this._apiService.get("/s/equipment/equipmentId/" + id).subscribe(
            data => {
                this.equipment = data;
                this.updateTabs();
            },
            error => {
                this._alertsService.error(
                    "Unable to get equipment details. Try Again."
                );
            }
        );
    }

    updateTabs() {
        this.tabs = this._sharedService.getTabstoShow(this.equipment);
    }
    save() {
        this._apiService
            .createOrUpdateEquipment(
                "/s/equipment/create-or-update-equipment",
                this.equipment
            )
            .subscribe(
                data => {
                    this.equipment = data;
                    this._alertsService.success("Equipment successfully saved");
                    this.initEquipment();
                },
                error => {
                    this._alertsService.error(
                        "Error occured while saving equpment details"
                    );
                }
            );
    }
}
