import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/Models/Token';
import { User } from 'src/app/Models/User';
import {
  getDecodedAccessToken,
  getToken,
  getUserTypeFromToken,
  getAccountStatusFromToken,
} from 'src/app/Services/UserServices/TokenService';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  token: Token = new Token();
  userType: string = '';
  accountStatus: string = '';
  user: User = new User();
  constructor() {}

  ngOnInit(): void {
    let token = getToken();
    console.log(token);
    if (token !== null) {
      this.accountStatus = getAccountStatusFromToken(token);
      this.userType = getUserTypeFromToken(token);
    }
  }
}
