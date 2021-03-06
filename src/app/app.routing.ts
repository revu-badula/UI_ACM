import { SystemDetailsComponent } from './system-component/system-tab/system-details/system-details.component';
import { SystemComponentComponent } from './system-component/system-component.component';
import { SystemTabComponent } from './system-component/system-tab/system-tab.component';
import { SystemSolutionstablelinkComponent } from './system-component/system-tab/system-solutionstablelink/system-solutionstablelink.component';
import { SystemBusinessComponent } from './system-component/system-tab/system-business/system-business.component';
import { SystemAssessmentComponent } from './system-component/system-tab/system-assessment/system-assessment.component';
import { SystemTechnicalComponent } from './system-component/system-tab/system-technical/system-technical.component';
import { SystemAuditComponent } from './system-component/system-tab/system-audit/system-audit.component';
import { SystemSecurityComponent } from './system-component/system-tab/system-security/system-security.component';
import { SystemAuditDetailsComponent } from './system-component/system-tab/system-audit/system-audit-details/system-audit-details.component';
import { SystemAuditFindingsComponent } from './system-component/system-tab/system-audit/system-audit-findings/system-audit-findings.component';
import { SystemAuditRecomendationsComponent } from './system-component/system-tab/system-audit/system-audit-recomendations/system-audit-recomendations.component';
import { SystemAuditActionComponent } from './system-component/system-tab/system-audit/system-audit-action/system-audit-action.component';
import { SystemAuditBusinessriskComponent } from './system-component/system-tab/system-audit/system-audit-businessrisk/system-audit-businessrisk.component';
import { SystemAuditSecurityriskComponent } from './system-component/system-tab/system-audit/system-audit-securityrisk/system-audit-securityrisk.component';
import { SystemAuditDetailsTab } from './system-component/system-tab/system-audit/system-audit-details/system-audit-details-tab/system-audit-details-tab.component';
import { SystemAuditLessonsComponent } from './system-component/system-tab/system-audit/system-audit-lessons/system-audit-lessons.component';
import { SystemAuditBudgetComponent } from './system-component/system-tab/system-audit/system-audit-budget/system-audit-budget.component';
import { SystemAuditAttachmentsComponent } from './system-component/system-tab/system-audit/system-audit-attachments/system-audit-attachments.component';
import { SystemLegalComponent } from './system-component/system-tab/system-legal/system-legal.component';
import { SystemAuditManagementComponent } from './system-component/system-tab/system-audit/system-audit-management/system-audit-management.component';
import { SystemViewComponentComponent } from './system-view-component/system-view-component.component';
import { SystemAddComponentComponent } from "./system-component/system-add-component/system-add-component.component";
import { SystemAuditFirstComponent } from './system-component/system-tab/system-audit/system-audit-first/system-audit-first.component';
import { LocalityDetailsComponent } from './locality-component/locality-tab/locality-details/locality-details.component';
import { WorkflowGuard } from './router-guard';
import { NgModule } from '@angular/core';
import { LocalityComponentComponent } from './locality-component/locality-component.component';
import { SystemAssessTabComponent } from './system-component/system-tab/system-assessment/system-assess-details/system-assess-tab/system-assess-tab.component';
import { SystemAssessDetailsComponent } from './system-component/system-tab/system-assessment/system-assess-details/system-assess-details.component';
import { SystemLegalformComponent } from './system-component/system-tab/system-legal/system-legalform/system-legalform.component';
import { SystemLegalmainComponent } from './system-component/system-tab/system-legal/system-legalmain/system-legalmain.component';
import { LocalityTabComponent } from './locality-component/locality-tab/locality-tab.component';
import { LocalitySolutionsComponent } from './locality-component/locality-tab/locality-solutions/locality-solutions.component';
import { LocalitySolutionsLinkComponent } from './locality-component/locality-tab/locality-solutions/locality-solutions-link/locality-solutions-link.component';
import { LocalitySolutionstablelinkComponent } from './locality-component/locality-tab/locality-solutionstablelink/locality-solutionstablelink.component';
import { LocalityBusinessComponent } from './locality-component/locality-tab/locality-business/locality-business.component';
import { LocalityAssessmentComponent } from './locality-component/locality-tab/locality-assessment/locality-assessment.component';
import { LocalityTechnicalComponent } from './locality-component/locality-tab/locality-technical/locality-technical.component';
import { LocalityAuditComponent } from './locality-component/locality-tab/locality-audit/locality-audit.component';
import { LocalitySecurityComponent } from './locality-component/locality-tab/locality-security/locality-security.component';
import { AuditDetailsComponent } from './locality-component/locality-tab/locality-audit/audit-details/audit-details.component';
import { AuditFindingsComponent } from './locality-component/locality-tab/locality-audit/audit-findings/audit-findings.component';
import { AuditRecomendationsComponent } from './locality-component/locality-tab/locality-audit/audit-recomendations/audit-recomendations.component';
import { AuditActionComponent } from './locality-component/locality-tab/locality-audit/audit-action/audit-action.component';
import { AuditBusinessriskComponent } from './locality-component/locality-tab/locality-audit/audit-businessrisk/audit-businessrisk.component';
import { AuditSecurityriskComponent } from './locality-component/locality-tab/locality-audit/audit-securityrisk/audit-securityrisk.component';
import { AuditDetailsTab } from './locality-component/locality-tab/locality-audit/audit-details/audit-details-tab/audit-details-tab.component';
import { AuditLessonsComponent } from './locality-component/locality-tab/locality-audit/audit-lessons/audit-lessons.component';
import { AuditControlComponent } from './locality-component/locality-tab/locality-audit/audit-control/audit-control.component';
import { AuditBudgetComponent } from './locality-component/locality-tab/locality-audit/audit-budget/audit-budget.component';
import { AuditAttachmentsComponent } from './locality-component/locality-tab/locality-audit/audit-attachments/audit-attachments.component';
import { LocalityLegalComponent } from './locality-component/locality-tab/locality-legal/locality-legal.component';
import { AuditManagementComponent } from './locality-component/locality-tab/locality-audit/audit-management/audit-management.component';
import { Routes, RouterModule, Router } from '@angular/router';
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
import { LogoutComponent } from './logout/logout.component';
import { LocalityAddComponentComponent } from "./locality-component/locality-add-component/locality-add-component.component";
import { ControlNameComponent } from './control-name/control-name.component';
import { PolicyAddComponent } from './policy-add/policy-add.component';
import { DeviceComponent } from './device/device.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { AuditFirstComponent } from './locality-component/locality-tab/locality-audit/audit-first/audit-first.component';
import { WorkflowGuardAudit } from './audit-guard';
import { WorkflowGuardAssess } from './assess-guard';
import { AssessTabComponent } from './locality-component/locality-tab/locality-assessment/assess-details/assess-tab/assess-tab.component';
import { AssessDetailsComponent } from './locality-component/locality-tab/locality-assessment/assess-details/assess-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LegalformComponent } from './locality-component/locality-tab/locality-legal/legalform/legalform.component';
import { LegalmainComponent } from './locality-component/locality-tab/locality-legal/legalmain/legalmain.component';
import { AuthGuard } from './login-guard';
import { AssessDowntabsComponent } from './locality-component/locality-tab/locality-assessment/assess-downtabs/assess-downtabs.component';
import { AssessFindComponent } from './locality-component/locality-tab/locality-assessment/assess-find/assess-find.component';
import { AssessRecomendComponent } from './locality-component/locality-tab/locality-assessment/assess-recomend/assess-recomend.component';
import { ManagementComponent } from './locality-component/locality-tab/locality-assessment/management/management.component';
import { AssessActionComponent } from './locality-component/locality-tab/locality-assessment/assess-action/assess-action.component';
import { AssessBusinessComponent } from './locality-component/locality-tab/locality-assessment/assess-business/assess-business.component';
import { AssessSecurityComponent } from './locality-component/locality-tab/locality-assessment/assess-security/assess-security.component';
import { AssessBudgetComponent } from './locality-component/locality-tab/locality-assessment/assess-budget/assess-budget.component';
import { AssessAttachmentsComponent } from './locality-component/locality-tab/locality-assessment/assess-attachments/assess-attachments.component';
import { AssessLessonsComponent } from './locality-component/locality-tab/locality-assessment/assess-lessons/assess-lessons.component';
import { DummyComponent } from './policy-view-component/policy-view-forms-component/dummy/dummy.component';
import { CanDeactivateGuard } from './deactive-guard-service';
import { LocalitysolutionsformComponent } from './locality-component/locality-tab/locality-solutions/localitysolutionsform/localitysolutionsform.component';
import { SystemGuardAudit } from './system-audit-guard';
import { SystemGuard } from './system-guard';
import { SystemAssessDowntabsComponent } from './system-component/system-tab/system-assessment/system-assess-downtabs/system-assess-downtabs.component';
import { SystemAssessFindComponent } from './system-component/system-tab/system-assessment/system-assess-find/system-assess-find.component';
import { SystemAssessRecomendComponent } from './system-component/system-tab/system-assessment/system-assess-recomend/system-assess-recomend.component';
import { SystemAssessManagementComponent } from './system-component/system-tab/system-assessment/system-assess-management/system-assess-management.component';
import { SystemAssessActionComponent } from './system-component/system-tab/system-assessment/system-assess-action/system-assess-action.component';
import { SystemAssessBusinessComponent } from './system-component/system-tab/system-assessment/system-assess-business/system-assess-business.component';
import { SystemAssessSecurityComponent } from './system-component/system-tab/system-assessment/system-assess-security/system-assess-security.component';
import { SystemAssessBudgetComponent } from './system-component/system-tab/system-assessment/system-assess-budget/system-assess-budget.component';
import { SystemAssessAttachmentsComponent } from './system-component/system-tab/system-assessment/system-assess-attachments/system-assess-attachments.component';
import { SystemAssessLessonsComponent } from './system-component/system-tab/system-assessment/system-assess-lessons/system-assess-lessons.component';
import { SystemGuardAssess } from './system-assess-guard';
import { ReportsComponent } from './reports/reports.component';
import { DevicetabComponent } from './devicetab/devicetab.component';
import { ReportLegalComponent } from './reports/report-legal/report-legal.component';
import { ReportSolutionsComponent } from './reports/report-solutions/report-solutions.component';
import { ReportVendorComponent } from './reports/report-vendor/report-vendor.component';
import { ReportDeviceComponent } from './reports/report-device/report-device.component';
import { ReportlegalsystemComponent } from './reports/reportlegalsystem/reportlegalsystem.component';
import { SubControlNameComponent } from './control-name/sub-control-name/sub-control-name.component';
import { AssessControlComponent } from './locality-component/locality-tab/locality-assessment/assess-control/assess-control.component';
import { AuditLandingComponent } from './locality-component/locality-tab/locality-audit/audit-landing/audit-landing.component';
import { AssesslandingComponent } from './locality-component/locality-tab/locality-assessment/assesslanding/assesslanding.component';
import { SystemassesscontrolComponent } from './system-component/system-tab/system-assessment/systemassesscontrol/systemassesscontrol.component';
import { SystemassesslandingComponent } from './system-component/system-tab/system-assessment/systemassesslanding/systemassesslanding.component';
import { SystemauditcontrolComponent } from './system-component/system-tab/system-audit/systemauditcontrol/systemauditcontrol.component';
import { SystemauditlandingComponent } from './system-component/system-tab/system-audit/systemauditlanding/systemauditlanding.component';
import { CallbackComponent } from './callback/callback.component';
import { enableDebugTools } from '@angular/platform-browser';
import { CallGuard } from './callguard';
import { AuthGuardLogin } from './loginpageguard';
import { AccesscontrolComponent } from './accesscontrol/accesscontrol.component';
import { AuditpolicyaddComponent } from './auditpolicyadd/auditpolicyadd.component';
import { AuditpolicyupdateComponent } from './auditpolicyupdate/auditpolicyupdate.component';
import { AssessmentpolicyaddComponent } from './assessmentpolicyadd/assessmentpolicyadd.component';
import { AssessmentpolicyupdateComponent } from './assessmentpolicyupdate/assessmentpolicyupdate.component';
import { Accesscontrol1Component } from './accesscontrol1/accesscontrol1.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PolicyreviewViewComponent } from './policyreview-view/policyreview-view.component';
import { AccesscontroldetailsComponent } from './accesscontroldetails/accesscontroldetails.component';
import { GraphComponent } from './graph/graph.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SampleQuestionComponent } from './sample-question/sample-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { BusinessComponent } from './business/business.component';
import { ReportspageComponent } from './reportspage/reportspage.component';
import { UpcomingAuditComponent } from './upcoming-audit/upcoming-audit.component';
import { NewpolicyComponent } from './newpolicy/newpolicy.component';
import { ScontrolComponent } from './scontrol/scontrol.component';
import { RmsComponent } from './rms/rms.component';
import { RmsStartComponent } from './rms-start/rms-start.component';
import { RmsdetailsComponent } from './rmsdetails/rmsdetails.component';
import { RmsoverviewComponent } from './rmsoverview/rmsoverview.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { SystemrmfComponent } from './system-component/system-tab/systemrmf/systemrmf.component';
import { SystemrmflandingComponent } from './system-component/system-tab/systemrmf/systemrmflanding/systemrmflanding.component';
import { SystemrmftabComponent } from './system-component/system-tab/systemrmf/systemrmftab/systemrmftab.component';
import { SystemrmffirstComponent } from './system-component/system-tab/systemrmf/systemrmffirst/systemrmffirst.component';
import { SystemrmfprocessComponent } from './system-component/system-tab/systemrmf/systemrmfprocess/systemrmfprocess.component';
import { SystemrmfprepareComponent } from './system-component/system-tab/systemrmf/systemrmfprepare/systemrmfprepare.component';
import { SystemrmftaskComponent } from './system-component/system-tab/systemrmf/systemrmftask/systemrmftask.component';
import { SystemrmffindingComponent } from './system-component/system-tab/systemrmf/systemrmffinding/systemrmffinding.component';
import { SystemrmfrecommendationsComponent } from './system-component/system-tab/systemrmf/systemrmfrecommendations/systemrmfrecommendations.component';
import { SystemrmfmanagementresponseComponent } from './system-component/system-tab/systemrmf/systemrmfmanagementresponse/systemrmfmanagementresponse.component';
import { rmfGuard } from './rmfguard';
import { SystemrmfactionplanComponent } from './system-component/system-tab/systemrmf/systemrmfactionplan/systemrmfactionplan.component';
import { SystemrmfbusinessriskComponent } from './system-component/system-tab/systemrmf/systemrmfbusinessrisk/systemrmfbusinessrisk.component';
import { DeviceentryComponent } from './deviceentry/deviceentry.component';
import { SystemrmfsecurityriskComponent } from './system-component/system-tab/systemrmf/systemrmfsecurityrisk/systemrmfsecurityrisk.component';
import { SystemrmfbudgetComponent } from './system-component/system-tab/systemrmf/systemrmfbudget/systemrmfbudget.component';
import { SystemrmfattachmentsComponent } from './system-component/system-tab/systemrmf/systemrmfattachments/systemrmfattachments.component';
import { SystemrmflessonslearnedComponent } from './system-component/system-tab/systemrmf/systemrmflessonslearned/systemrmflessonslearned.component';
import { IncidentinfoComponent } from './incident-module/incidentinfo/incidentinfo.component';
import { IncidentdetailComponent } from './incident-module/incidentdetail/incidentdetail.component';
import { IncidentclassificationComponent } from './incident-module/incidentclassification/incidentclassification.component';
import { IncidentImpactComponent } from './incident-module/incident-impact/incident-impact.component';
import { IncidentAssignmentComponent } from './incident-module/incident-assignment/incident-assignment.component';
import { IncidentResolutionComponent } from './incident-module/incident-resolution/incident-resolution.component';
import { IncidentBusinessComponent } from './incident-module/incident-business/incident-business.component';
import { IncidentTechnicalComponent } from './incident-module/incident-technical/incident-technical.component';
import { IncidentcapComponent } from './incident-module/incidentcap/incidentcap.component';
import { IncidentcloseComponent } from './incident-module/incidentclose/incidentclose.component';
import { IncidentstartComponent } from './incident-module/incidentstart/incidentstart.component';
import { NewBusinessImpactComponetComponent } from './incident-module/new-business-impact-componet/new-business-impact-componet.component';
import { IncidentBusinessImpactComponent } from './incident-module/incident-business-impact/incident-business-impact.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { ITPMComponent } from './itpm/itpm.component';
import { ItAuditComponent } from './itpm/it-audit/it-audit.component';
import { ItIncidentComponent } from './itpm/it-incident/it-incident.component';
import { NewsidebarComponent } from './newsidebar/newsidebar.component';
import { NewitpmComponent } from './newitpm/newitpm.component';
import { AuditsComponent } from './audits/audits.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { SystemdetailsComponent } from './systemdetails/systemdetails.component';
import { PolicyStartComponent } from './policy/policy-start/policy-start.component';
import { PolicydetailsComponent } from './policy/policydetails/policydetails.component';
import { PolicyreviewComponent } from './policy/policyreview/policyreview.component';
import { PolicydocumentsComponent } from './policy/policydocuments/policydocuments.component';
import { PolicyapplicationComponent } from './policy/policyapplication/policyapplication.component';
import { PolicyfamiliesComponent } from './policy/policyfamilies/policyfamilies.component';
import { PolicyComponent } from './policy/policy.component';
import { PolicyParentComponent } from './policy/policy-parent/policy-parent.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { InfradetailsComponent } from './infradetails/infradetails.component';
import { AdminPolicyComponent } from './policy/admin-policy/admin-policy.component';

const appRoutes: Routes = [

  { path: '', component: DisclaimerComponent },
  { path: 'log', component: LoginPageComponent, canActivate: [AuthGuardLogin] },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuardLogin] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'home' } },
  { path: 'logout', component: LogoutComponent },
  { path: 'devicetab', component: DevicetabComponent, canActivate: [AuthGuard] },
  { path: 'vendors', component: VendorsComponentComponent, canActivate: [AuthGuard] },
  { path: 'solutions', component: SolutionsComponent, canActivate: [AuthGuard] },
  { path: 'vendorsView', component: VendorsViewComponent, canActivate: [AuthGuard] },
  { path: 'accessControl/:id', component: ControlNameComponent, canActivate: [AuthGuard] },
  { path: 'accessControlDetails/:id', component: AccesscontroldetailsComponent, canActivate: [AuthGuard] },
  { path: 'accessCntrl/:id', component: AccesscontrolComponent, canActivate: [AuthGuard] },
  { path: 'accessUpdate/:id', component: AuditpolicyupdateComponent, canActivate: [AuthGuard] },
  //{ path: 'policy', component: PolicyComponentComponent, canActivate: [AuthGuard] },
  { path: 'policyreviewview/:id', component: PolicyreviewViewComponent, canActivate: [AuthGuard] },
  { path: 'policyAdd', component: PolicyAddComponent, canActivate: [AuthGuard] },
  { path: 'deviceInventory', component: DeviceComponent, canActivate: [AuthGuard] },
  { path: 'updateDevice/:id', component: UpdateDeviceComponent, canActivate: [AuthGuard] },
  { path: 'systemView', component: SystemViewComponentComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'rlegal', component: ReportLegalComponent, canActivate: [AuthGuard] },
  { path: 'rsolution', component: ReportSolutionsComponent, canActivate: [AuthGuard] },
  { path: 'rvendor', component: ReportVendorComponent, canActivate: [AuthGuard] },
  { path: 'rdevice', component: ReportDeviceComponent, canActivate: [AuthGuard] },
  { path: 'rsystems', component: ReportlegalsystemComponent, canActivate: [AuthGuard] },
  { path: 'subcontrol/:id', component: SubControlNameComponent, canActivate: [AuthGuard] },
  { path: 'auditPolAdd', component: AuditpolicyaddComponent, canActivate: [AuthGuard] },
  { path: 'assessmentPolicyAdd', component: AssessmentpolicyaddComponent, canActivate: [AuthGuard] },
  { path: 'accessCntrl1/:id', component: Accesscontrol1Component, canActivate: [AuthGuard] },
  { path: 'accessUpdate1/:id', component: AssessmentpolicyupdateComponent, canActivate: [AuthGuard] },
  { path: 'graph', component: GraphComponent, canActivate: [AuthGuard], data: { title: 'graph' } },
  { path: 'sidebar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'sample', component: SampleQuestionComponent, canActivate: [AuthGuard] },
  { path: 'createQuestion', component: CreateQuestionComponent, canActivate: [AuthGuard] },
  { path: 'resImpactAnalysis', component: ReportspageComponent, canActivate: [AuthGuard] },
  { path: 'upcomingAudit', component: UpcomingAuditComponent, canActivate: [AuthGuard] },
  { path: 'newPolicy', component: NewpolicyComponent, canActivate: [AuthGuard] },
  { path: 'deviceEntry', component: DeviceentryComponent, canActivate: [AuthGuard] },
  { path: 'mytasks', component: MyTaskComponent, canActivate: [AuthGuard] },
  {path: 'adminPolicy', component : AdminPolicyComponent, canActivate: [AuthGuard] },
  {path: 'createPolicy', component : PolicyFormsComponent, canActivate: [AuthGuard] },

  {
    path: 'callback', component: CallbackComponent, canActivate: [CallGuard]
  },

  {
    path: "locality", component: LocalityComponentComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'map',
        component: LocalityAddComponentComponent, canActivate: [AuthGuard]
      },
      {
        path: 'tab',
        component: LocalityTabComponent, canActivate: [AuthGuard],
        children: [
          {
            path: 'info',
            component: LocalityDetailsComponent, canActivate: [AuthGuard]
          },
          {
            path: 'assessment',
            component: LocalityAssessmentComponent, canActivate: [WorkflowGuard],
            children: [
              {
                path: '',
                component: AssesslandingComponent, canActivate: [AuthGuard]
              },
              {
                path: 'assessmentOverview',
                component: AssessTabComponent, canActivate: [AuthGuard]
              },
              {
                path: 'Tabs',
                component: AssessDowntabsComponent, canActivate: [AuthGuard],

                children: [{

                  path: 'first1',
                  component: AssessDetailsComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'find1',
                  component: AssessFindComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'assesscontrol',
                  component: AssessControlComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'recomendation1',
                  component: AssessRecomendComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'management1',
                  component: ManagementComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'action1',
                  component: AssessActionComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'brisk1',
                  component: AssessBusinessComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'srisk1',
                  component: AssessSecurityComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'budget1',
                  component: AssessBudgetComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard],
                },
                {
                  path: 'attachment1',
                  component: AssessAttachmentsComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'lessons1',
                  component: AssessLessonsComponent, canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
                }
                ]
              }
            ]


          },
          //  {
          //  path: 'Tab1',
          //component: AssessTabComponent,

          //children: [{

          //path: 'first1',
          //component: AssessDetailsComponent
          //},
          {
            path: 'technical',
            component: LocalityTechnicalComponent, canActivate: [WorkflowGuard]
          },
          {
            path: 'legal',
            component: LocalityLegalComponent, canActivate: [WorkflowGuard],
            children: [
              {
                path: '',
                component: LegalmainComponent, canActivate: [WorkflowGuard]
              },
              {
                path: 'legalform',
                component: LegalformComponent, canActivate: [WorkflowGuard]
              }
            ]
          },
          {
            path: 'solutions',
            component: LocalitySolutionsComponent, canActivate: [WorkflowGuard],
            children: [
              {
                path: '', component: LocalitySolutionsLinkComponent, canActivate: [WorkflowGuard]
              },
              {
                path: 'solutionForm', component: LocalitysolutionsformComponent, canActivate: [WorkflowGuard]
              }
            ]
          },
          {
            path: 'security',
            component: LocalitySecurityComponent, canActivate: [WorkflowGuard]
          },
          {
            path: 'link',
            component: LocalitySolutionstablelinkComponent, canActivate: [WorkflowGuard]
          },
          {
            path: 'business',
            component: LocalityBusinessComponent, canActivate: [WorkflowGuard]
          },
          {

            path: 'Audit',
            component: LocalityAuditComponent, canActivate: [WorkflowGuard],
            children: [
              {
                path: '',
                component: AuditLandingComponent, canActivate: [AuthGuard]
              },
              {
                path: 'auditOverview',
                component: AuditDetailsComponent, canActivate: [AuthGuard]
              },
              {
                path: 'Tab',
                component: AuditDetailsTab, canActivate: [AuthGuard],

                children: [{
                  path: 'first',
                  component: AuditFirstComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'find',
                  component: AuditFindingsComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'controlLocality',
                  component: AuditControlComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'recomendation',
                  component: AuditRecomendationsComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'management',
                  component: AuditManagementComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'action',
                  component: AuditActionComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'brisk',
                  component: AuditBusinessriskComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'srisk',
                  component: AuditSecurityriskComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'budget',
                  component: AuditBudgetComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'attachment',
                  component: AuditAttachmentsComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'lessons',
                  component: AuditLessonsComponent, canActivate: [WorkflowGuardAudit], canDeactivate: [CanDeactivateGuard]
                  //    }
                  //  ]
                }

                ]
              }
            ]
          }
        ]
      }
    ]
  },
  { path: 'localityView', component: LocalityViewComponentComponent, canActivate: [AuthGuard] },
  { path: 'solutionsView', component: SolutionViewComponentComponent, canActivate: [AuthGuard] },
  { path: 'editSolutions/:id', component: EditSolutionComponent, canActivate: [AuthGuard] },
  { path: 'editVendors/:id', component: EditVendorComponent, canActivate: [AuthGuard] },
  {
    path: 'policyView', component: PolicyViewComponentComponent, canActivate: [AuthGuard], children: [
      { path: 'policyDetails', component: PolicyDetailsComponent, canActivate: [AuthGuard] },
      { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
      { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
      { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
      { path: 'dummy', component: DummyComponent, canActivate: [AuthGuard] }]
  },

  {
    path: 'spolicy', component: NewpolicyComponent, canActivate: [AuthGuard],
    children: [
      { path: 'policySrt', component: PolicyViewComponentComponent, canActivate: [AuthGuard] },
      { path: 'sdetails', component: PolicyDetailsComponent, canActivate: [AuthGuard] },
      { path: 'sreview', component: ReviewComponent, canActivate: [AuthGuard] },
      { path: 'sdocuments', component: DocumentsComponent, canActivate: [AuthGuard] },
      { path: 'sapplications', component: ApplicationsComponent, canActivate: [AuthGuard] },
      { path: 'scontrol/:id', component: ScontrolComponent, canActivate: [AuthGuard] },
      { path: 'dummy/:id', component: DummyComponent, canActivate: [AuthGuard] },
      { path: 'saccesscontrol/:id', component: ControlNameComponent, canActivate: [AuthGuard] }
    ]

  },
  {
    path: 'rms', component: RmsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'rmsSrt', component: RmsStartComponent, canActivate: [AuthGuard] },
      { path: 'rmsdetails/:id', component: RmsdetailsComponent, canActivate: [AuthGuard] },
      { path: 'rmsoverview', component: RmsoverviewComponent, canActivate: [AuthGuard] },
      { path: 'taskdetails/:id', component: TaskdetailsComponent, canActivate: [AuthGuard] }
    ]
  },



  {
    path: "system", component: SystemComponentComponent, canActivate: [AuthGuard],
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'map',
        component: SystemAddComponentComponent, canActivate: [AuthGuard]
        // canActivate: [AuthGuard]
      },
      {
        path: 'tab2',
        component: SystemTabComponent, canActivate: [AuthGuard],
        //canActivate: [AuthGuard],
        children: [
          {
            path: 'info',
            component: SystemDetailsComponent, canActivate: [AuthGuard]
            // canActivate: [AuthGuard]
          },
          {
            path: 'technical',
            component: SystemTechnicalComponent, canActivate: [SystemGuard]
            // canActivate: [SystemGuard]
          },
          {
            path: 'business', component: BusinessComponent, canActivate: [SystemGuard]
          },
          {
            path: 'legal',
            component: SystemLegalComponent, canActivate: [SystemGuard],
            // canActivate: [SystemGuard],
            children: [
              {
                path: '',
                component: SystemLegalmainComponent, canActivate: [AuthGuard],
              },
              {
                path: 'legalform',
                component: SystemLegalformComponent, canActivate: [AuthGuard],
              }
            ]
          },

          {
            path: 'security',
            component: SystemSecurityComponent, canActivate: [SystemGuard]
            // canActivate: [SystemGuard]
          },
          {
            path: 'rmf', component: SystemrmfComponent, canActivate: [SystemGuard],
            children: [
              {
                path: '', component: SystemrmflandingComponent, canActivate: [SystemGuard]
              },
              {
                path: "tabrmf", component: SystemrmftabComponent, canActivate: [SystemGuard],
                children: [
                  {
                    path: 'rmfStart', component: SystemrmffirstComponent, canActivate: [SystemGuard]
                  },
                  {
                    path: 'rmfProcess', component: SystemrmfprocessComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfControls/:id', component: SystemrmfprepareComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmftask/:id', component: SystemrmftaskComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfFinding', component: SystemrmffindingComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfRecom', component: SystemrmfrecommendationsComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfManage', component: SystemrmfmanagementresponseComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfaction', component: SystemrmfactionplanComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfbusiness', component: SystemrmfbusinessriskComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfsecurity', component: SystemrmfsecurityriskComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfbudget', component: SystemrmfbudgetComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmfattachment', component: SystemrmfattachmentsComponent, canActivate: [rmfGuard]
                  },
                  {
                    path: 'rmflessons', component: SystemrmflessonslearnedComponent, canActivate: [rmfGuard]
                  }
                ]
              }
            ]
          },
          {
            path: 'assessment',
            component: SystemAssessmentComponent, canActivate: [SystemGuard],
            //canActivate: [WorkflowGuard],

            children: [{

              path: '',
              component: SystemassesslandingComponent, canActivate: [AuthGuard]
              // canActivate: [AuthGuard]
            },
            {

              path: 'sysassessoverview',
              component: SystemAssessTabComponent, canActivate: [AuthGuard]
              // canActivate: [AuthGuard]
            },
            {
              path: 'Tabs2',
              component: SystemAssessDowntabsComponent, canActivate: [AuthGuard],
              // canActivate: [AuthGuard],

              children: [{

                path: 'first2',
                component: SystemAssessDetailsComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]
                // canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'find2',
                component: SystemAssessFindComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'syscontrol',
                component: SystemassesscontrolComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'recomendation2',
                component: SystemAssessRecomendComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                //canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'management2',
                component: SystemAssessManagementComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'action2',
                component: SystemAssessActionComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                //canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'brisk2',
                component: SystemAssessBusinessComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'srisk2',
                component: SystemAssessSecurityComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'budget2',
                component: SystemAssessBudgetComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard],
              },
              {
                path: 'attachment2',
                component: SystemAssessAttachmentsComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                // canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              },
              {
                path: 'lessons2',
                component: SystemAssessLessonsComponent, canActivate: [SystemGuardAssess], canDeactivate: [CanDeactivateGuard]
                //canActivate: [WorkflowGuardAssess], canDeactivate: [CanDeactivateGuard]
              }
              ]
            }
            ]


          },

          {
            path: 'link',
            component: SystemSolutionstablelinkComponent, canActivate: [SystemGuard]
            // canActivate: [WorkflowGuard]
          },
          {
            path: 'business1',
            component: SystemBusinessComponent, canActivate: [SystemGuard]
            // canActivate: [WorkflowGuard]
          },
          {

            path: 'Audit',
            component: SystemAuditComponent, canActivate: [SystemGuard],
            // canActivate: [WorkflowGuard],
            children: [
              {
                path: '',
                component: SystemauditlandingComponent, canActivate: [AuthGuard]
                // canActivate: [AuthGuard]
              },
              {
                path: 'sysauditoverview',
                component: SystemAuditDetailsComponent, canActivate: [AuthGuard]
                // canActivate: [AuthGuard]
              },
              {
                path: 'Tab',
                component: SystemAuditDetailsTab, canActivate: [AuthGuard],

                children: [{
                  path: 'first',
                  component: SystemAuditFirstComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'auditControl',
                  component: SystemauditcontrolComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'find',
                  component: SystemAuditFindingsComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'recomendation',
                  component: SystemAuditRecomendationsComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'management',
                  component: SystemAuditManagementComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'action',
                  component: SystemAuditActionComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'brisk',
                  component: SystemAuditBusinessriskComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'srisk',
                  component: SystemAuditSecurityriskComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'budget',
                  component: SystemAuditBudgetComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'attachment',
                  component: SystemAuditAttachmentsComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                },
                {
                  path: 'lessons',
                  component: SystemAuditLessonsComponent, canActivate: [SystemGuardAudit], canDeactivate: [CanDeactivateGuard]
                  //    }
                  //  ]
                }

                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'newBusinessImpact', component: NewBusinessImpactComponetComponent, canActivate: [AuthGuard],
    children: [
      { path: 'info', component: IncidentdetailComponent },
      { path: 'classification', component: IncidentclassificationComponent },
      { path: 'impact', component: IncidentImpactComponent },
      { path: 'assignment', component: IncidentAssignmentComponent },
      { path: 'resolution', component: IncidentResolutionComponent },
      { path: 'business', component: IncidentBusinessComponent },
      { path: 'technical', component: IncidentTechnicalComponent },
      { path: 'cap', component: IncidentcapComponent },
      { path: 'close', component: IncidentcloseComponent },
      { path: 'businessImpact', component: IncidentBusinessImpactComponent },
    ]
  },
  {
    path: 'incident', component: IncidentinfoComponent, canActivate: [AuthGuard],
    children: [
      { path: 'info', component: IncidentdetailComponent },
      { path: 'classification', component: IncidentclassificationComponent },
      { path: 'impact', component: IncidentImpactComponent },
      { path: 'assignment', component: IncidentAssignmentComponent },
      { path: 'resolution', component: IncidentResolutionComponent },
      { path: 'business', component: IncidentBusinessComponent },
      { path: 'technical', component: IncidentTechnicalComponent },
      { path: 'cap', component: IncidentcapComponent },
      { path: 'close', component: IncidentcloseComponent },
      { path: 'businessImpact', component: IncidentBusinessImpactComponent },
    ]
  },
  { path: 'incidentStart', component: IncidentstartComponent, canActivate: [AuthGuard] },
  { path: 'incidentStart/:type', component: IncidentstartComponent, canActivate: [AuthGuard] },
  { path: 'itpm', component: ITPMComponent, canActivate: [AuthGuard] },
  { path: 'itpmAudit/:id/:type', component: ItAuditComponent, canActivate: [AuthGuard] },
  { path: 'itpmIncident/:id', component: ItIncidentComponent, canActivate: [AuthGuard] },
  { path: 'newItpm', component: NewitpmComponent, canActivate: [AuthGuard] },
  { path: 'newAudit', component: AuditsComponent, canActivate: [AuthGuard] },
  { path: 'newAudit/:id/:type', component: AuditsComponent, canActivate: [AuthGuard] },
  { path: 'newAssessment', component: AssessmentsComponent, canActivate: [AuthGuard] },
  { path: 'newInfrastructure', component: InfrastructureComponent, canActivate: [AuthGuard] },
  { path: 'newIncidents', component: IncidentsComponent, canActivate: [AuthGuard] },
  { path: 'newSystemDetails', component: SystemdetailsComponent, canActivate: [AuthGuard] },
  { path: 'infraDetails/:type', component: InfradetailsComponent, canActivate: [AuthGuard] },
  { path: 'assetDetails/:id', component: AssetDetailComponent, canActivate: [AuthGuard] },
  {
    path: 'firstpolicy', component: PolicyParentComponent, children: [
      {
        path: 'main/:id',
        component: PolicyStartComponent
      },
      {
        path: 'details',
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
      },
      {
        path: 'families',
        component: PolicyfamiliesComponent
      },
      {
        path: 'newaccesscontrol/:id',
        component: ControlNameComponent
      }

    ], canActivate: [AuthGuard]
  },
  { path: 'policy', component: PolicyComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
  providers: [WorkflowGuard, WorkflowGuardAudit, AuthGuard,
    WorkflowGuardAssess, CanDeactivateGuard, SystemGuardAudit, SystemGuard,
    SystemGuardAssess, CallGuard, AuthGuardLogin, rmfGuard]

})
//export class SystemComponentRoutingModule {}
export class LocalityComponentRoutingModule {

  // constructor(private router: Router) {
  //   this.router.errorHandler = (error: any) => {
  //     let routerError = error.toString();
  //             if (routerError.indexOf('Cannot match any routes') >= 0 ) {
  //                 this.router.navigate(['/404']);
  //             } else {
  //                 throw error;
  //             }
  //   }
  //   }
}
