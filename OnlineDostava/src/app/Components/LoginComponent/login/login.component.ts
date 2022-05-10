import { Component, OnInit } from '@angular/core';
import { appName } from '../../../AppName/AppName';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/UserServices/UserServices';
import { Token } from 'src/app/Models/Token';
import { ToastrService } from 'ngx-toastr';
import { setToken } from 'src/app/Services/UserServices/TokenService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = appName + 'login';
  alertError: string = '';
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    );
    if (this.loginForm.valid) {
      console.log('usaoooo');
      let login: User = new User();
      login.userName = this.loginForm.controls['username'].value;
      login.password = this.loginForm.controls['password'].value;
      console.log(login);
      this.alertError = '';
      this.service.login(login).subscribe(
        (data: Token) => {
          if (data === null) {
            this.toastr.error(
              'Incorrect username or password.',
              'Authentication failed.'
            );
          } else {
            console.log(data);
            //localStorage.setItem('token', data._Token);
            setToken(data._Token);
            this.router.navigateByUrl('/user');
          }
        },
        (error) => {
          this.toastr.error(
            'Incorrect username or password.',
            'Authentication failed.'
          );
        }
      );
    } else {
      console.log('nije usao');
      this.alertError = 'Nepravilno uneseni podaci.';
    }
    //Pozvati servis za login

    //this.router.navigateByUrl('/user');
  }
  onRegister() {
    console.log('usao');
    this.router.navigateByUrl('/registration');
  }
  constructor(
    private service: UserService,
    private router: Router, // private toastr: ToastrService
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    console.log('on init login');
    //if (localStorage.getItem('token') != null)
    //this.router.navigateByUrl('login');
  }
}
