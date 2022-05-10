import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/UserServices/UserServices';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  alertError: string = '';
  userType: string = 'administrator';
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
    birthDate: new FormControl(Date.now(), Validators.required),
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
      this.userUpdateForm.controls['password'].value ===
        this.userUpdateForm.controls['password2'].value
    ) {
      console.log('usao rpvo');
      var givenDate = this.userUpdateForm.controls['birthDate'].value;
      var currentDate = new Date();
      givenDate = new Date(givenDate);
      if (givenDate < currentDate) {
        console.log('usao');
        let user: User = new User();
        user.userName = this.userUpdateForm.controls['userName'].value;
        user.email = this.userUpdateForm.controls['email'].value;
        user.password = this.userUpdateForm.controls['password'].value;
        user.name = this.userUpdateForm.controls['name'].value;
        user.lastName = this.userUpdateForm.controls['lastName'].value;
        user.birthDate = this.userUpdateForm.controls['birthDate'].value;
        user.address = this.userUpdateForm.controls['address'].value;
        //user.userType = this.userUpdateForm.controls['userType'].value;
        this.service.updateProfile(user).subscribe(
          (data) => {
            this.router.navigateByUrl('/user');
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
  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userUpdateForm.controls['name'].setValue('mile');
  }
}
