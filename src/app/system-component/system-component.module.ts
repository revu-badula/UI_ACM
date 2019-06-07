import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SystemComponentRoutingModule} from '../app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponentModule } from '../navigation-component/navigation-component.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { SystemAddComponentComponent } from './system-add-component/system-add-component.component';
import { SystemTabComponent } from './system-tab/system-tab.component'
import { OptionListModule } from '../option-list/option-list.module';
import { SystemComponentComponent } from './system-component.component';
import { SystemDetailsComponent } from './system-tab/system-details/system-details.component';
import { SystemSolutionsComponent } from './system-tab/system-solutions/system-solutions.component';
import { SystemSolutionsLinkComponent } from './system-tab/system-solutions/system-solutions-link/system-solutions-link.component';
import { SystemSolutionstablelinkComponent } from './system-tab/system-solutionstablelink/system-solutionstablelink.component';
import { SystemBusinessComponent } from './system-tab/system-business/system-business.component';
import { SystemAuditComponent } from './system-tab/system-audit/system-audit.component';
import { SystemAuditDetailsComponent } from './system-tab/system-audit/system-audit-details/system-audit-details.component';
import { SystemAuditFindingsComponent } from './system-tab/system-audit/system-audit-findings/system-audit-findings.component';
import { SystemAuditRecomendationsComponent } from './system-tab/system-audit/system-audit-recomendations/system-audit-recomendations.component';
import { SystemLegalComponent } from './system-tab/system-legal/system-legal.component';
import { SystemAuditManagementComponent } from './system-tab/system-audit/system-audit-management/system-audit-management.component';
import { SystemSecurityComponent } from './system-tab/system-security/system-security.component';
import { SystemAuditActionComponent } from './system-tab/system-audit/system-audit-action/system-audit-action.component';
import { SystemAuditBusinessriskComponent } from './system-tab/system-audit/system-audit-businessrisk/system-audit-businessrisk.component';
import { SystemAuditSecurityriskComponent } from './system-tab/system-audit/system-audit-securityrisk/system-audit-securityrisk.component';
import { SystemAuditBudgetComponent } from './system-tab/system-audit/system-audit-budget/system-audit-budget.component';
import { SystemAuditAttachmentsComponent } from './system-tab/system-audit/system-audit-attachments/system-audit-attachments.component';
import { SystemAssessmentComponent } from './system-tab/system-assessment/system-assessment.component';
import { SystemTechnicalComponent } from './system-tab/system-technical/system-technical.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SystemFilterPipeDate } from './system-date-filter';
import { SystemFilterAuditName } from './system-auditname-filter';
import { SystemAuditFirstComponent } from './system-tab/system-audit/system-audit-first/system-audit-first.component';
import { SystemAuditDetailsTab } from './system-tab/system-audit/system-audit-details/system-audit-details-tab/system-audit-details-tab.component';
import { SystemAuditLessonsComponent } from './system-tab/system-audit/system-audit-lessons/system-audit-lessons.component';
import { SystemAssessDetailsComponent } from './system-tab/system-assessment/system-assess-details/system-assess-details.component';
import { SystemAssessTabComponent } from './system-tab/system-assessment/system-assess-details/system-assess-tab/system-assess-tab.component';
import { SystemAuditDetailsTab1 } from './system-tab/system-audit/system-audit-details/system-auditDetailsTab';
import { SystemLegalformComponent } from './system-tab/system-legal/system-legalform/system-legalform.component';
import { SystemLegalmainComponent } from './system-tab/system-legal/system-legalmain/system-legalmain.component';
import { KeysPipe } from './system-pipe';
import { NgxTinymceModule } from 'ngx-tinymce';
import { SystemAssessDowntabsComponent } from './system-tab/system-assessment/system-assess-downtabs/system-assess-downtabs.component';
import { LocalityComponentRoutingModule } from '../app.routing';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { SystemAssessFindComponent } from './system-tab/system-assessment/system-assess-find/system-assess-find.component';
import { SystemAssessActionComponent } from './system-tab/system-assessment/system-assess-action/system-assess-action.component';
import { SystemAssessAttachmentsComponent } from './system-tab/system-assessment/system-assess-attachments/system-assess-attachments.component';
import { SystemAssessBudgetComponent } from './system-tab/system-assessment/system-assess-budget/system-assess-budget.component';
import { SystemAssessBusinessComponent } from './system-tab/system-assessment/system-assess-business/system-assess-business.component';
import { SystemAssessLessonsComponent } from './system-tab/system-assessment/system-assess-lessons/system-assess-lessons.component';
import { SystemAssessRecomendComponent } from './system-tab/system-assessment/system-assess-recomend/system-assess-recomend.component';
import { SystemAssessSecurityComponent } from './system-tab/system-assessment/system-assess-security/system-assess-security.component';
import { SystemAssessManagementComponent } from './system-tab/system-assessment/system-assess-management/system-assess-management.component';
import { LocalityComponentModule } from '../locality-component/locality-component.module';
import { SystemassesscontrolComponent } from './system-tab/system-assessment/systemassesscontrol/systemassesscontrol.component';
import { SystemassesslandingComponent } from './system-tab/system-assessment/systemassesslanding/systemassesslanding.component';
import { SystemauditlandingComponent } from './system-tab/system-audit/systemauditlanding/systemauditlanding.component';
import { SystemauditcontrolComponent } from './system-tab/system-audit/systemauditcontrol/systemauditcontrol.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxCurrencyModule } from "ngx-currency";
import { NgSelectModule } from '@ng-select/ng-select';
import { SystemrmfComponent } from './system-tab/systemrmf/systemrmf.component';
import { SystemrmflandingComponent } from './system-tab/systemrmf/systemrmflanding/systemrmflanding.component';
import { SystemrmftabComponent } from './system-tab/systemrmf/systemrmftab/systemrmftab.component';
import { SystemrmffirstComponent } from './system-tab/systemrmf/systemrmffirst/systemrmffirst.component';
import { SystemrmfprocessComponent } from './system-tab/systemrmf/systemrmfprocess/systemrmfprocess.component';
import { SystemrmfprepareComponent } from './system-tab/systemrmf/systemrmfprepare/systemrmfprepare.component';
import { SystemrmftaskComponent } from './system-tab/systemrmf/systemrmftask/systemrmftask.component';
import { SystemrmffindingComponent } from './system-tab/systemrmf/systemrmffinding/systemrmffinding.component';
import { SystemrmfrecommendationsComponent } from './system-tab/systemrmf/systemrmfrecommendations/systemrmfrecommendations.component';
import { SystemrmfmanagementresponseComponent } from './system-tab/systemrmf/systemrmfmanagementresponse/systemrmfmanagementresponse.component';
import { SystemrmfactionplanComponent } from './system-tab/systemrmf/systemrmfactionplan/systemrmfactionplan.component';
import { SystemrmfbusinessriskComponent } from './system-tab/systemrmf/systemrmfbusinessrisk/systemrmfbusinessrisk.component';
import { SystemrmfsecurityriskComponent } from './system-tab/systemrmf/systemrmfsecurityrisk/systemrmfsecurityrisk.component';
import { SystemrmfbudgetComponent } from './system-tab/systemrmf/systemrmfbudget/systemrmfbudget.component';
import { SystemrmfattachmentsComponent } from './system-tab/systemrmf/systemrmfattachments/systemrmfattachments.component';
import { SystemrmflessonslearnedComponent } from './system-tab/systemrmf/systemrmflessonslearned/systemrmflessonslearned.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NavigationComponentModule,
    Angular2FontawesomeModule,
    OptionListModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ClickOutsideModule,
    NgxCurrencyModule,
    LocalityComponentModule,
    NgSelectModule,
   // SystemComponentRoutingModule,
   LocalityComponentRoutingModule,
    MyDatePickerModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rotatingPlane,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
      backdropBorderRadius: '4px',
      primaryColour: '#fff', 
      secondaryColour: '#fff', 
      tertiaryColour: '#fff',
      fullScreenBackdrop:true
  }),
 
  NgxPaginationModule,
  NgxTinymceModule.forRoot({
    //baseURL: './assets/tinymce/',
  })
  ],
  declarations: [SystemAddComponentComponent, SystemTabComponent,SystemComponentComponent, SystemDetailsComponent, SystemSolutionsComponent, SystemSolutionsLinkComponent, SystemSolutionstablelinkComponent, SystemBusinessComponent, SystemAuditComponent, SystemAuditDetailsComponent, SystemAuditFindingsComponent, SystemAuditRecomendationsComponent, SystemLegalComponent, SystemAuditManagementComponent, SystemSecurityComponent, SystemAuditActionComponent, SystemAuditBusinessriskComponent, SystemAuditSecurityriskComponent, 
  SystemAuditBudgetComponent, SystemAuditAttachmentsComponent, SystemAssessmentComponent, 
  SystemTechnicalComponent,SystemFilterPipeDate, SystemFilterAuditName,SystemAuditFirstComponent, SystemAuditDetailsTab, SystemAuditLessonsComponent, SystemAssessDetailsComponent, SystemAssessTabComponent,SystemAuditDetailsTab1, SystemLegalformComponent, SystemLegalmainComponent,KeysPipe, SystemAssessDowntabsComponent, SystemAssessFindComponent, SystemAssessActionComponent, SystemAssessAttachmentsComponent, SystemAssessBudgetComponent, SystemAssessBusinessComponent, SystemAssessLessonsComponent, SystemAssessRecomendComponent, SystemAssessSecurityComponent, SystemAssessManagementComponent, SystemassesscontrolComponent, SystemassesslandingComponent, SystemauditlandingComponent, SystemauditcontrolComponent, SystemrmfComponent, SystemrmflandingComponent, SystemrmftabComponent, SystemrmffirstComponent, SystemrmfprocessComponent, SystemrmfprepareComponent, SystemrmftaskComponent, SystemrmffindingComponent, SystemrmfrecommendationsComponent, SystemrmfmanagementresponseComponent, SystemrmfactionplanComponent, SystemrmfbusinessriskComponent, SystemrmfsecurityriskComponent, SystemrmfbudgetComponent, SystemrmfattachmentsComponent, SystemrmflessonslearnedComponent],
  providers:[DatePipe]
})
export class SystemComponentModule {}
