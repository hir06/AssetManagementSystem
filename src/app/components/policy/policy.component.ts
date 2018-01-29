import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  policy:any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
