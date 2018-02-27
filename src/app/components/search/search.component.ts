import { ApiService } from "./../../services/api.services";
import { Component, Directive, OnInit, Input, Output, EventEmitter, ViewContainerRef,  } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";
import { SharedService } from "../../services/shared.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public dropDownsData: any;
  constructor(
      private _sharedService: SharedService,
      private _apiService: ApiService,
      private _alertsService: AlertsLoaderService,
      private route: ActivatedRoute
  ) {
      this.dropDownsData = this._sharedService.dropDownsData;
      this._sharedService.dropDownsService.subscribe(data => {
          this.dropDownsData = data;
      });
  }
    @Input() asset: any;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();

    ngOnInit() {

    }

}
