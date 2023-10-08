import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CustomersComponent } from './components/dashboard/customers/customers.component';
import { CustomerDetailComponent } from './components/dashboard/customer-detail/customer-detail.component';
import { DashboardContentComponent } from './components/dashboard/dashboard-content/dashboard-content.component';
import { PrivacyPolicyComponent } from './components/dashboard/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './components/dashboard/imprint/imprint.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard-content', pathMatch: 'full' },
      { path: 'dashboard-content', component: DashboardContentComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/:id', component: CustomerDetailComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'imprint', component: ImprintComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }