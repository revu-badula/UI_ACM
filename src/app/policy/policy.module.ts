import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxTinymceModule } from 'ngx-tinymce';
import { ChartsModule } from 'ng2-charts';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MatGridListModule, MatSidenavModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { PolicyStartComponent } from './policy-start/policy-start.component';
import { PolicydetailsComponent } from './policydetails/policydetails.component';
import { SubControlPipe } from './status';
import { PolicyreviewComponent } from './policyreview/policyreview.component';
import { PolicydocumentsComponent } from './policydocuments/policydocuments.component';
import { PolicyapplicationComponent } from './policyapplication/policyapplication.component';
import { RouterModule } from '@angular/router';
import { PolicyParentComponent } from './policy-parent/policy-parent.component';
import { LocalityComponentRoutingModule } from '../app.routing';
import { PolicyfamiliesComponent } from './policyfamilies/policyfamilies.component';
import { NavigationComponentModule } from '../navigation-component/navigation-component.module';
import { IncidentModuleModule } from '../incident-module/incident-module.module';
import { policyService } from './policy-service';
import { PolicyComponent } from './policy.component';
@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    LocalityComponentRoutingModule,
    NgxCurrencyModule,
    NgxSummernoteModule,
    IncidentModuleModule,
    NavigationComponentModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rotatingPlane,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#fff',
      secondaryColour: '#fff',
      tertiaryColour: '#fff',
      fullScreenBackdrop: true
    }),
    ChartsModule,
    NgxTinymceModule.forRoot({
    }),
    Angular2FontawesomeModule,
    MatGridListModule,
    MatSidenavModule,
    NgxPaginationModule,
    RouterModule,
    LocalityComponentRoutingModule
    //PolicyRoutingModule
  ],
  declarations: [
    PolicyStartComponent,
    PolicydetailsComponent,
    SubControlPipe,
    PolicyreviewComponent,
    PolicydocumentsComponent,
    PolicyapplicationComponent,
    PolicyParentComponent,
    PolicyfamiliesComponent,
    PolicyComponent,
  ],
  providers:[policyService]
})
export class PolicyModule { }
