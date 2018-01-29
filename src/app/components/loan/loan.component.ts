import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loan:any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
