import { Component, OnInit } from '@angular/core';

declare function AccountTab() : any;
declare function NiceSelect() : any;

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AccountTab()
    NiceSelect()
  }

}
