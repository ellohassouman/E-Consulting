import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/Services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public SecurityService: SecurityService) { }

  ngOnInit(): void {
    this.SecurityService.InitFormGroup()
  }

}
