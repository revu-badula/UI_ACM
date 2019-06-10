import { Component, OnInit, ChangeDetectorRef,AfterViewInit} from '@angular/core';
declare let tinymce: any;
import { Location } from '@angular/common';
import { IMBusinessRiskDTO } from '../incident-model';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { IncidentManagementDTO } from '../incident-model';
import { APP_CONFIG } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '../../dialog.service';
import { IncidentinfoComponent } from '../incidentinfo/incidentinfo.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-incidentclose',
  templateUrl: './incidentclose.component.html',
  styleUrls: ['./incidentclose.component.css']
})
export class IncidentcloseComponent implements OnInit,AfterViewInit {
  public len: number = 0;
  public showEditButton: boolean;
  public test: any;
  public loading: boolean;
  public imBusinessRiskDTO: IMBusinessRiskDTO;
  public incidentManagementDTO: IncidentManagementDTO;
  public subDate: any;
  config: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  constructor(private ref: ChangeDetectorRef, private _location: Location,
    private datepipe: DatePipe, private httpClient: HttpClient,
    private dialogService: DialogService,private info:IncidentinfoComponent,private router:Router) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.imBusinessRiskDTO = new IMBusinessRiskDTO();
    this.incidentManagementDTO = new IncidentManagementDTO();
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
  }

  ngOnInit() {
    this.getIncident();
  }
  ngAfterViewInit() {
    
  }  

  backClicked() {
    this._location.back();
  }

  getIncident() {
    // let inId = +sessionStorage.getItem('incidentName');
    // this.loading = true;
    // let url = APP_CONFIG.getIncident;
    // this.httpClient.get(url + "?incidentId=" + inId)
    //   .subscribe((data: any) => {
    //     this.loading = false;
    
    if(this.info.test !== undefined){
      this.imBusinessRiskDTO.incidentManagementId = this.info.test.incidentId;
      }
      else{
        this.router.navigate(['/incident/info']);
      }
      // }, error => {
      //   this.loading = false;
      //   console.log(error);
      // });

  }



  getData(editor: any) {
    this.len = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len = 0;
      this.ref.detectChanges();
    }
    else {
      this.len = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

  saveBusinessRisk() {
    this.loading = true;
    let url = APP_CONFIG.saveIMCloseOut;
    this.httpClient.post(url, this.imBusinessRiskDTO)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialogService.open("Info", "Closeout Summary has been created.", false, "OK", "OK")
          .then((result: any) => {
          })
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getRenDate(value: any) {
    if (value.formatted === "") {
      this.imBusinessRiskDTO.submittedOn = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.imBusinessRiskDTO.submittedOn = moment(latest_date).format();
    }
  }

  





}
