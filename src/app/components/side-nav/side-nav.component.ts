import { SharedService } from './../../services/shared.service';
import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() thisView: string;
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    //this.thisView = this._sharedService.activeView;
  }

  // navigateToView(view){
  //   this.thisView = view;
  //   this._sharedService.activeView = view;
  // }

}
