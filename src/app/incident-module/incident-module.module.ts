import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentinfoComponent } from './incidentinfo/incidentinfo.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxTinymceModule } from 'ngx-tinymce';
import { ChartsModule} from 'ng2-charts';
import { NavigationComponentModule } from '../navigation-component/navigation-component.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { LocalityComponentRoutingModule } from '../app.routing';
import { IncidentdetailComponent } from './incidentdetail/incidentdetail.component';
import { IncidentclassificationComponent } from './incidentclassification/incidentclassification.component';
import { IncidentImpactComponent } from './incident-impact/incident-impact.component';
import { IncidentAssignmentComponent } from './incident-assignment/incident-assignment.component';
import { IncidentResolutionComponent } from './incident-resolution/incident-resolution.component';
import { IncidentBusinessComponent } from './incident-business/incident-business.component';
import { IncidentTechnicalComponent } from './incident-technical/incident-technical.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MyDatePickerModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgxCurrencyModule,
    NgxSummernoteModule,
    BrowserAnimationsModule,
    NavigationComponentModule,
    ReactiveFormsModule,
    LocalityComponentRoutingModule,
    NgxPaginationModule,
    ChartsModule,
    Angular2FontawesomeModule,
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
  declarations: [IncidentinfoComponent, IncidentdetailComponent, IncidentclassificationComponent, IncidentImpactComponent, IncidentAssignmentComponent, IncidentResolutionComponent, IncidentBusinessComponent, IncidentTechnicalComponent]
})
export class IncidentModuleModule { }
