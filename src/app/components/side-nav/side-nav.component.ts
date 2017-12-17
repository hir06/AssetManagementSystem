import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  thisView: string = "dashboard";
  constructor() { }

  ngOnInit() {
  }

  navigateToView(view){
    this.thisView = view;
  }

}
