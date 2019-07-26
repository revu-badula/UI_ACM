import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyStartComponent } from './policy-start/policy-start.component';
import { PolicydetailsComponent } from './policydetails/policydetails.component';
import { PolicyreviewComponent } from './policyreview/policyreview.component';
import { PolicydocumentsComponent } from './policydocuments/policydocuments.component';
import { PolicyapplicationComponent } from './policyapplication/policyapplication.component';


const routes: Routes = [
  {
    path: 'main/:id',
    component: PolicyStartComponent
  },
  {
    path: 'details',
    component: PolicydetailsComponent
  },
  {
    path: 'details/:id',
    component: PolicydetailsComponent
  },
  {
    path: 'review',
    component: PolicyreviewComponent
  },
  {
    path: 'documents',
    component: PolicydocumentsComponent
  },
  {
    path: 'application',
    component: PolicyapplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
