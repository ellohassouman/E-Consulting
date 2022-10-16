import { Component, OnInit } from '@angular/core';
import { RequesterService } from '../Services/requester.service';

declare function Notification() : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public RequesterService : RequesterService) { }

  ngOnInit(): void {
    console.log(this.RequesterService.GetCurrentRoute())
  }

  ShowNotification()
  {
    Notification()
  }

}
