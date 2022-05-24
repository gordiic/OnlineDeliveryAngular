import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/UserServices/UserServices';
import { UserType } from 'src/app/Models/UserType';
import { AccountStatus } from 'src/app/Models/AccountStatus';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  url: string = '';
  alertError: string = '';
  userType: string = '';
  accountStatus: string = '';

  userUpdateForm = new FormGroup({
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
    name: new FormControl(this.user.name, Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    //userType: new FormControl('', Validators.required),
  });

  onUpdate() {
    console.log(
      this.userUpdateForm.controls['password'].value,
      this.userUpdateForm.controls['password2'].value
    );
    if (
      this.userUpdateForm.valid &&
      this.url.length !== 0 &&
      this.userUpdateForm.controls['password'].value ===
        this.userUpdateForm.controls['password2'].value
    ) {
      var givenDate = this.userUpdateForm.controls['birthDate'].value;
      var currentDate = new Date();
      // this.user.userType = (<any>UserType)[this.userType];
      //console.log(this.user.userType);
      givenDate = new Date(givenDate);
      if (givenDate < currentDate) {
        console.log('usao');
        let user: User = new User();
        user.userType = (<any>UserType)[this.userType];
        console.log(user.userType);
        user.userName = this.userUpdateForm.controls['userName'].value;
        user.email = this.userUpdateForm.controls['email'].value;
        user.password = this.userUpdateForm.controls['password'].value;
        user.name = this.userUpdateForm.controls['name'].value;
        user.lastName = this.userUpdateForm.controls['lastName'].value;
        user.birthDate = this.userUpdateForm.controls['birthDate'].value;
        user.address = this.userUpdateForm.controls['address'].value;
        user.image = this.url;
        user.accountStatus = (<any>AccountStatus)[this.accountStatus];
        this.alertError = '';
        this.service.updateProfile(user).subscribe(
          (data) => {
            console.log('data', data);

            this.userType = data.userType;
            this.userUpdateForm.controls['name'].setValue(data.name);
            this.userUpdateForm.controls['lastName'].setValue(data.lastName);
            this.userUpdateForm.controls['userName'].setValue(data.userName);
            this.userUpdateForm.controls['email'].setValue(data.email);
            this.userUpdateForm.controls['password'].setValue('');
            this.userUpdateForm.controls['password2'].setValue('');
            this.userUpdateForm.controls['address'].setValue(data.address);
            //this.router.navigateByUrl('/user');
          },
          (error) => {
            this.toastr.error('Desila se neka greska, sta sad da radimo.');
          }
        );
      }
    } else {
      this.alertError = 'Popunite pravilno sve parametre za izmjenu profila.';
    }
  }
  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let user = this.service.getProfile().subscribe(
      (data) => {
        console.log(data);
        //const bcrypt = require('bcrypt');
        this.userType = data.userType;
        this.accountStatus = data.accountStatus;
        console.log(this.userType);
        this.userUpdateForm.controls['name'].setValue(data.name);
        this.userUpdateForm.controls['lastName'].setValue(data.lastName);
        this.userUpdateForm.controls['userName'].setValue(data.userName);
        this.userUpdateForm.controls['email'].setValue(data.email);
        this.userUpdateForm.controls['birthDate'].setValue(data.birthDate);
        this.userUpdateForm.controls['address'].setValue(data.address);
        this.url = data.image;
        console.log(this.url);
        //getElementById('ItemPreview').src = 'data:image/png;base64,' + yourByteArrayAsBase64;
      },
      (error) => {
        this.toastr.error('Desila se neka greska, sta sad da radimo.');
      }
    );
  }
}
