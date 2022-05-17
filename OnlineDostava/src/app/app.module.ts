import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamComponent } from './Components/team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';
import { LoginComponent } from './Components/LoginComponent/login/login.component';
import { RegistrationComponent } from './Components/RegistrationComponent/registration/registration.component';
import { UserProfileComponent } from './Components/UserProfile/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';
import { VerificationComponent } from './Components/VerifictionComponent/verification/verification.component';
import { AddproductComponent } from './Components/AddProduct/addproduct/addproduct.component';
import { NeworderComponent } from './Components/NewOrderComponent/neworder/neworder.component';
import { MyordersComponent } from './Components/MyOrdersComponent/myorders/myorders.component';
import { NewordersComponent } from './Components/NewOrders/neworders/neworders.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    NavBarComponent,
    VerificationComponent,
    AddproductComponent,
    NeworderComponent,
    MyordersComponent,
    NewordersComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
