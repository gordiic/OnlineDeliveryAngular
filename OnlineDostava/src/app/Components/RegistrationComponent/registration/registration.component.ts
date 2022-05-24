import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/UserServices/UserServices';
import { AccountStatus } from 'src/app/Models/AccountStatus';
import { UserType } from 'src/app/Models/UserType';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  alertError: string = '';
  url: string = '';
  registrationForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
  });

  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  onRegister() {
    // console.log(this.registrationForm);
    // let dateTimeToday = new Date();
    //console.log(dateTimeToday);
    console.log(this.url);
    if (
      this.registrationForm.valid &&
      this.url.length !== 0 &&
      this.registrationForm.controls['password'].value ===
        this.registrationForm.controls['password2'].value
    ) {
      var givenDate = this.registrationForm.controls['birthDate'].value;
      var currentDate = new Date();
      givenDate = new Date(givenDate);
      if (givenDate < currentDate) {
        let user: User = new User();
        user.userName = this.registrationForm.controls['userName'].value;
        user.email = this.registrationForm.controls['email'].value;
        user.password = this.registrationForm.controls['password'].value;
        user.name = this.registrationForm.controls['name'].value;
        user.lastName = this.registrationForm.controls['lastName'].value;
        user.birthDate = this.registrationForm.controls['birthDate'].value;
        user.address = this.registrationForm.controls['address'].value;
        user.image = this.url;
        user.userType = this.registrationForm.controls['userType']
          .value as UserType;
        if (
          user.userType == UserType.ordinaryUser ||
          user.userType == UserType.administrator
        ) {
          user.accountStatus = AccountStatus.accepted;
        } else {
          user.accountStatus = AccountStatus.processing;
        }
        console.log(user);

        this.service.register(user).subscribe(
          (data) => {
            console.log('Vraceni podaci' + data);
            this.router.navigateByUrl('/login');
          },
          (error) => {
            this.toastr.error('Desila se neka greska.');
          }
        );
      }
    } else {
      this.alertError = 'Popunite pravilno sve parametre za registraciju.';
    }
  }
  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
}
