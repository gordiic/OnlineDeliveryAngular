import { Component, OnInit } from '@angular/core';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/UserServices/UserServices';
import { AccountStatus } from 'src/app/Models/AccountStatus';
import { UserType } from 'src/app/Models/UserType';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  users: User[] = [];

  constructor() {}

  ngOnInit(): void {
    var u2: User = new User();
    u2.name = 'nebojsa';
    u2.lastName = 'gordic';
    u2.accountStatus = AccountStatus.accepted;
    console.log(u2.accountStatus);
    u2.userName = 'gorda';
    this.users.push(u2);
    for (let i = 0; i < 10; i++) {
      var u: User = new User();
      u.name = 'nebojsa' + String(i);
      u.lastName = 'gordic' + String(i);
      u.accountStatus = AccountStatus.processing;
      u.userName = 'gorda';
      this.users.push(u);
    }
  }
}
