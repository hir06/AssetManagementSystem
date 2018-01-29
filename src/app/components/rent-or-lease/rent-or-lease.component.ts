import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rent-or-lease',
  templateUrl: './rent-or-lease.component.html',
  styleUrls: ['./rent-or-lease.component.scss']
})
export class RentOrLeaseComponent implements OnInit {
  rent:any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
