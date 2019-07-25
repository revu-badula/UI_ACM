import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MyDatePickerModule } from 'mydatepicker';
import { RegisterService } from './services/register.service';
import { HttpModule } from '@angular/http';
import { LocalityComponentRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponentModule } from './navigation-component/navigation-component.module';
import { OptionListModule } from './option-list/option-list.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorsComponentComponent } from './vendors-component/vendors-component.component';
import { VendorsViewComponent } from './vendors-view/vendors-view.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { FormsComponent } from './forms/forms.component';
import { SolutionsFormsComponentComponent } from './solutions/solutions-forms-component/solutions-forms-component.component';
import { PolicyComponentComponent } from './policy-component/policy-component.component';
import { PolicyViewComponentComponent } from './policy-view-component/policy-view-component.component';
import { ContactComponentComponent } from './solutions/solutions-forms-component/contact-component/contact-component.component';
import { PolicyViewFormsComponentComponent } from './policy-view-component/policy-view-forms-component/policy-view-forms-component.component';
import { ViewTableComponent } from './vendors-view/view-table/view-table.component';
import { LocalityViewComponentComponent } from './locality-view-component/locality-view-component.component';
import { SystemViewComponentComponent } from './system-view-component/system-view-component.component';
import { SolutionViewComponentComponent } from './solution-view-component/solution-view-component.component';
import { PolicyFormsComponent } from './policy-component/policy-forms/policy-forms.component';
import { RegisterComponent } from './services/register.component';
import { SolutionTableComponent } from './solution-view-component/solution-table/solution-table.component';
import { PolicyDetailsComponent } from './policy-view-component/policy-view-forms-component/policy-details/policy-details.component';
import { EditSolutionComponent } from './edit-solution/edit-solution.component';
import { EditSolutionFormComponent } from './edit-solution/edit-solution-form/edit-solution-form.component';
import { ReviewComponent } from './policy-view-component/policy-view-forms-component/review/review.component';
import { DocumentsComponent } from './policy-view-component/policy-view-forms-component/documents/documents.component';
import { ApplicationsComponent } from './policy-view-component/policy-view-forms-component/applications/applications.component';
import { DialogBoxComponent } from './policy-view-component/policy-view-forms-component/documents/dialog-box/dialog-box.component';
import { EditNavigationComponent } from './edit-navigation/edit-navigation.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { UtilService } from './util.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { LocalityComponentModule } from "./locality-component/locality-component.module";
import { SystemComponentModule } from "./system-component/system-component.module";
import { ControlNameComponent } from './control-name/control-name.component';
import { PolicyAddComponent } from './policy-add/policy-add.component';
import { DeviceComponent } from './device/device.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { ApiserviceService } from './apiservice.service';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert/alert.component';
import { AuthenticationService } from './authentication.service';
import { CanDeactivateGuard } from './deactive-guard-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DummyComponent } from './policy-view-component/policy-view-forms-component/dummy/dummy.component';
import { DialogService } from './dialog.service';
import { HttpClientModule } from '@angular/common/http';
import { UserIdleModule } from 'angular-user-idle';
import { ReportsComponent } from './reports/reports.component';
import { SignedPipe } from './signed-pipe';
import { DevicetabComponent } from './devicetab/devicetab.component';
import { IdleTimeoutService } from './idleTimeOutService';
import { DialogComponent } from './dialog.service';
import { CustomCurrencyPipe } from './currency-pipe';
import { CurrencyPipe, APP_BASE_HREF} from '@angular/common';
import { ReportLegalComponent } from './reports/report-legal/report-legal.component';
import { ReportSolutionsComponent } from './reports/report-solutions/report-solutions.component';
import { ReportVendorComponent } from './reports/report-vendor/report-vendor.component';
import { ReportDeviceComponent } from './reports/report-device/report-device.component';
import { ReportlegalsystemComponent } from './reports/reportlegalsystem/reportlegalsystem.component';
import { SubControlNameComponent } from './control-name/sub-control-name/sub-control-name.component';
import { SubControlPipe } from './sub-control-status';
import { ControlPipe } from './control-status';
import { ClickOutsideModule } from 'ng-click-outside';
import { CallbackComponent } from './callback/callback.component';
import { OktaAuthService } from './okta/oka.service';
import { SampleComponent } from './sample/sample.component';
import { AccesscontrolComponent } from './accesscontrol/accesscontrol.component';
import { AuditpolicyaddComponent } from './auditpolicyadd/auditpolicyadd.component';
import { AuditpolicyupdateComponent } from './auditpolicyupdate/auditpolicyupdate.component';
import { AssessmentpolicyupdateComponent } from './assessmentpolicyupdate/assessmentpolicyupdate.component';
import { Accesscontrol1Component } from './accesscontrol1/accesscontrol1.component';
import { AssessmentpolicyaddComponent } from './assessmentpolicyadd/assessmentpolicyadd.component';
import { NgxCurrencyModule } from "ngx-currency";
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PolicyreviewViewComponent } from './policyreview-view/policyreview-view.component';
import { AccesscontroldetailsComponent } from './accesscontroldetails/accesscontroldetails.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ChartsModule} from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SampleQuestionComponent } from './sample-question/sample-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { BusinessComponent } from './business/business.component';
import { OnlyNumber } from './onlyNumber';
import { OnlyNumber1 } from './onlyNumber1';
import { ReportspageComponent } from './reportspage/reportspage.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpcomingAuditComponent } from './upcoming-audit/upcoming-audit.component';
import { NewpolicyComponent } from './newpolicy/newpolicy.component';
import { PolicysidebarComponent } from './policysidebar/policysidebar.component';
import { ScontrolComponent } from './scontrol/scontrol.component';
import { RmsComponent } from './rms/rms.component';
import { RmsStartComponent } from './rms-start/rms-start.component';
import { RmsdetailsComponent } from './rmsdetails/rmsdetails.component';
import { RmsoverviewComponent } from './rmsoverview/rmsoverview.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { DeviceentryComponent } from './deviceentry/deviceentry.component';
import { IncidentModuleModule } from './incident-module/incident-module.module';
import { MatGridListModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MyTaskComponent } from './my-task/my-task.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';
import { ITPMComponent } from './itpm/itpm.component';
import { ItAuditComponent } from './itpm/it-audit/it-audit.component';
import { ItIncidentComponent } from './itpm/it-incident/it-incident.component';
import { NewsidebarComponent } from './newsidebar/newsidebar.component';
import { NewtogglebarComponent } from './newtogglebar/newtogglebar.component';
import { NewitpmComponent } from './newitpm/newitpm.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LocalityViewComponentComponent,
    SystemViewComponentComponent,
    VendorsComponentComponent,
    VendorsViewComponent,
    SolutionsComponent,
    FormsComponent,
    SolutionsFormsComponentComponent,
    PolicyComponentComponent,
    PolicyViewComponentComponent,
    ContactComponentComponent,
    PolicyViewFormsComponentComponent,
    DevicetabComponent,
    ViewTableComponent,
    SolutionViewComponentComponent,
    PolicyFormsComponent,
    RegisterComponent,
    SolutionTableComponent,
    PolicyDetailsComponent,
    EditSolutionComponent,
    EditSolutionFormComponent,
    ReviewComponent,
    DocumentsComponent,
    ApplicationsComponent,
    DialogBoxComponent,
    EditVendorComponent,
    EditNavigationComponent,
    ControlNameComponent,
    PolicyAddComponent,
    DeviceComponent,
    UpdateDeviceComponent,
    LoginPageComponent,
    LogoutComponent,
    AlertComponent,
    DummyComponent,
    ReportsComponent,
    SignedPipe,
    DialogComponent,
    CustomCurrencyPipe,
    ReportLegalComponent,
    ReportSolutionsComponent,
    ReportVendorComponent,
    ReportDeviceComponent,
    ReportlegalsystemComponent,
    SubControlNameComponent,
    SubControlPipe,
    ControlPipe,
    CallbackComponent,
    SampleComponent,
    AccesscontrolComponent,
    AuditpolicyaddComponent,
    AuditpolicyupdateComponent,
    AssessmentpolicyupdateComponent,
    Accesscontrol1Component,
    AssessmentpolicyaddComponent,
    AssessmentpolicyupdateComponent,
    DisclaimerComponent,
    PolicyreviewViewComponent,
    AccesscontroldetailsComponent,
    GraphComponent,
    NavbarComponent,
    SampleQuestionComponent,
    CreateQuestionComponent,
    BusinessComponent,
    OnlyNumber,
    OnlyNumber1,
    ReportspageComponent,
    UpcomingAuditComponent,
    NewpolicyComponent,
    PolicysidebarComponent,
    ScontrolComponent,
    RmsComponent,
    RmsStartComponent,
    RmsdetailsComponent,
    RmsoverviewComponent,
    TaskdetailsComponent,
    DeviceentryComponent,
    MyTaskComponent,
    ITPMComponent,
    ItAuditComponent,
    ItIncidentComponent,
    NewsidebarComponent,
    NewtogglebarComponent,
    NewitpmComponent
  ],

  imports: [
    BrowserModule,
    NgSelectModule,
    Angular2FontawesomeModule,
    MyDatePickerModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    HighchartsChartModule,
    NgxCurrencyModule,
    LocalityComponentRoutingModule,
    LocalityComponentModule,
    NgxSummernoteModule,
    SystemComponentModule,
    IncidentModuleModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    NavigationComponentModule,
    OptionListModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    MatGridListModule,
    MatSidenavModule,
    NgbModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rotatingPlane,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#fff',
      secondaryColour: '#fff',
      tertiaryColour: '#fff',
      fullScreenBackdrop: true
    }),
    NgxTinymceModule.forRoot({
    })
  ],
  entryComponents: [
    DialogBoxComponent, DialogComponent
  ],
  providers: [RegisterService, UtilService,{provide:APP_BASE_HREF, useValue:'/Integra/'}, ApiserviceService, AlertService, OktaAuthService,
    AuthenticationService, CanDeactivateGuard, DialogService, IdleTimeoutService, CurrencyPipe,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
