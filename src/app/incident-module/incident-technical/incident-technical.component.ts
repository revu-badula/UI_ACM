import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-incident-technical',
  templateUrl: './incident-technical.component.html',
  styleUrls: ['./incident-technical.component.css']
})
export class IncidentTechnicalComponent implements OnInit {

  public len: number = 0;
  public loading: boolean;
  public showEditButton: boolean;
  public test: any;
  public imBusinessRiskDTO: IMBusinessRiskDTO;
  public incidentManagementDTO: IncidentManagementDTO;
  public subDate:any;
  public businessDTOs:any;
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
     private dialogService: DialogService,private info:IncidentinfoComponent, private router: Router) {
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
    this.getIncident()
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
        // if(data.businessRiskDTOs !== undefined && data.businessRiskDTOs !== null && data.businessRiskDTOs.length > 0)
        // {
        //  for(let i =0 ;i<data.businessRiskDTOs.length;i++)
        //  {
        //   this.imBusinessRiskDTO=data.businessRiskDTOs[i];
        //  }
        //   if(this.imBusinessRiskDTO.submittedOn !== undefined && this.imBusinessRiskDTO.submittedOn !==null)
        //   {
            
        //       let d = new Date(this.imBusinessRiskDTO.submittedOn);
        //       let year = d.getFullYear();
        //       let month = d.getMonth() + 1;
        //       let day = d.getDate();
        //       this.subDate = {
        //         date: { month: month, day: day, year: year }
        //       };
        //     }
        //     else{
        //       this.subDate=null;
        //     }
        // }
        if(this.info.test !== undefined && this.info.test !== null){
        this.imBusinessRiskDTO.incidentManagementId = this.info.test.incidentId;
        this.businessDTOs = this.info.test.businessRiskDTOs;
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

  saveBusinessRisk() {
    this.loading = true;
    let url = APP_CONFIG.saveIMBusiness;
    this.httpClient.post(url, this.imBusinessRiskDTO)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialogService.open("Info","Business Risk has been created.",false,"OK","OK")
        .then((result:any)=>{
          
        })
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

}
