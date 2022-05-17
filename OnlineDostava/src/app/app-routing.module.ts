import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/LoginComponent/login/login.component';
import { RegistrationComponent } from './Components/RegistrationComponent/registration/registration.component';
import { UserProfileComponent } from './Components/UserProfile/user-profile/user-profile.component';
import { VerificationComponent } from './Components/VerifictionComponent/verification/verification.component';
import { AddproductComponent } from './Components/AddProduct/addproduct/addproduct.component';
import { NeworderComponent } from './Components/NewOrderComponent/neworder/neworder.component';
import { MyordersComponent } from './Components/MyOrdersComponent/myorders/myorders.component';
import { NewordersComponent } from './Components/NewOrders/neworders/neworders.component';
//import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'user',
    component: UserProfileComponent,
    // children: [
    //   {
    //     path: 'verification',
    //     component: VerificationComponent,
    //   },
    // ],
  },
  { path: 'verification', component: VerificationComponent },
  { path: 'addProduct', component: AddproductComponent },
  { path: 'neworder', component: NeworderComponent },
  { path: 'myorders', component: MyordersComponent },
  { path: 'neworders', component: NewordersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
