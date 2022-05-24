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
  onVerificate(id: number, accountStatus: string) {
    console.log('id', id);
    this.userService.verificateUser(id, accountStatus).subscribe(
      (data: User) => {
        console.log(data);
        if (data === null) {
          this.toastr.error('Nema korisnika.');
        } else {
          for (let i = 0; i < this.users.length; i++) {
            if (data.id === this.users[i].id) {
              this.users[i].accountStatus = data.accountStatus;
              return;
            }
          }
        }
      },
      (error) => {
        this.toastr.error('Desila se neka greska.');
      }
    );
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  verificated(accountStatus: string) {
    if (accountStatus === String(AccountStatus.processing)) {
      return true;
    } else {
      return false;
    }
  }
  declined(accountStatus: string) {
    if (accountStatus === String(AccountStatus.declined)) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        console.log(data);
        if (data === null) {
          this.toastr.error('Nema korisnika.');
        } else {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            this.users.push(data[i]);
          }
        }
      },
      (error) => {
        this.toastr.error('Desila se neka greska.');
      }
    );
  }
}
