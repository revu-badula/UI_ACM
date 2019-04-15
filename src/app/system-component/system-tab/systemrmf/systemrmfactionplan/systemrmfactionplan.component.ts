import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../app.config';
import { Router } from '@angular/router';
import { RMFApplicationDTO } from '../../../../review_DataModel';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../../../dialog.service';
import { Cookie } from 'ng2-cookies';
declare let tinymce: any;
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-systemrmfactionplan',
  templateUrl: './systemrmfactionplan.component.html',
  styleUrls: ['./systemrmfactionplan.component.css']
})
export class SystemrmfactionplanComponent implements OnInit {
  @ViewChild('myForm') myForm: FormGroup;

  public loading: boolean;
  public showEdit: boolean=true;
  public len: any = 0;
  public len1: any = 0;
  public len2: any = 0;
  public startDate: any;
  public endDate: any;
  public users:any;
  public rmfApplicationDTO: RMFApplicationDTO;
  myDatePickerOptions: IMyDpOptions = {
    disableUntil: { year: 0, month: 0, day: 0 },
    showTodayBtn: false

  };
  config: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };

  config1: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config2: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  constructor(private httpClient: HttpClient, private router: Router,
    private datepipe: DatePipe, private dialog: DialogService, private ref: ChangeDetectorRef) {
    this.rmfApplicationDTO = new RMFApplicationDTO();
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
    this.config1.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData1(editor);
      });
    };
    this.config2.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData2(editor);
      });
    };
  }

  ngOnInit() {
    this.getAppId();
  }


  getAppId() {
    this.loading = true;
    let url = APP_CONFIG.viewApplication;
    this.httpClient.get(url + "?" + "acronym=" + sessionStorage.getItem('systemName')
    ).subscribe((data: any) => {
      this.loading = false;
      this.rmfApplicationDTO.applicationId = data.applicationViewDTO.applicationId;
      this.showOnPageLoad();
    }, error => {
      this.loading = false;
      console.log(error);
    });

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


  getData1(editor: any) {
    this.len1 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len1: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len1 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len1 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len1 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };


  getData2(editor: any) {
    this.len2 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len2: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len2 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len2 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len2 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

  showOnPageLoad() {

    this.loading = true;
    let id = sessionStorage.getItem('systemRmfId');
    let rmfid = +id;
    let url = APP_CONFIG.getAppRMF;
    let url1 = APP_CONFIG.getUsers;
    Observable.forkJoin(
      this.httpClient.get(url + "?" + "rmfAppId=" + rmfid),
      this.httpClient.get(url1)
    ).subscribe((data: any) => {
        this.loading = false;
        this.rmfApplicationDTO = data[0];
        this.users=data[1];
        if (this.rmfApplicationDTO.actionPlanSummary != undefined) {
          let des = this.rmfApplicationDTO.actionPlanSummary.replace(/<[^>]+>/gm, '');
          this.len1 = des.length;
        }
        if (this.rmfApplicationDTO.actionPlanTasks != undefined) {
          let des = this.rmfApplicationDTO.actionPlanTasks.replace(/<[^>]+>/gm, '');
          this.len = des.length;
        }
        if (this.rmfApplicationDTO.actionPlanCloseoutComments != undefined) {
          let des = this.rmfApplicationDTO.actionPlanCloseoutComments.replace(/<[^>]+>/gm, '');
          this.len2 = des.length;
        }
        let day: any, month: any, year: any;

        if (this.rmfApplicationDTO.actionPlanStartDt === undefined ||this.rmfApplicationDTO.actionPlanStartDt === null) {
          this.startDate = { date: null };
          this.myForm.controls['endDate'].disable();
        }
        else {
          let d = new Date(this.rmfApplicationDTO.actionPlanStartDt);
          day = d.getDate();
          month = d.getMonth() + 1;
          year = d.getFullYear();
          this.startDate = { date: { year: year, month: month, day: day } };
        }

        if (this.rmfApplicationDTO.actionPlanEndDt === undefined ||this.rmfApplicationDTO.actionPlanEndDt === null) {
          this.endDate = { date: null };
        } else {
          let dt = new Date(this.rmfApplicationDTO.actionPlanEndDt);
          let day1 = dt.getDate();
          let month1 = dt.getMonth() + 1;
          let year1 = dt.getFullYear();
          this.endDate = { date: { year: year1, month: month1, day: day1 } };
          this.myDatePickerOptions.disableUntil.day = day;
          this.myDatePickerOptions.disableUntil.month = month;
          this.myDatePickerOptions.disableUntil.year = year;
          this.myDatePickerOptions.showTodayBtn = false;
        }





      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  getStartDate(value:any) {
    this.myForm.controls['endDate'].disable();
    this.endDate = null;
    if (value.formatted === "") {
      this.rmfApplicationDTO.actionPlanStartDt = null;
    }
    else {
      this.endDate = null;
      //this.audate = Date.parse(d);
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.rmfApplicationDTO.actionPlanStartDt = moment(latest_date).format();
      let d = new Date(value.formatted);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      this.myDatePickerOptions.disableUntil.day = day;
      this.myDatePickerOptions.disableUntil.month = month;
      this.myDatePickerOptions.disableUntil.year = year;
      this.myDatePickerOptions.showTodayBtn = false;
      this.myForm.controls['endDate'].enable();
    }

  }


  getEndDate(value:any) {
    if (value.formatted === "") {
      this.rmfApplicationDTO.actionPlanEndDt = null;
    }
    else {
      let d = value.formatted;
      //this.audate = Date.parse(d);
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.rmfApplicationDTO.actionPlanEndDt = moment(latest_date).format();
    }

  }

  showRmf() {
    this.router.navigate(['/system/tab2/rmf']);
  }
  valueChanged() {
    this.showEdit = false;
  }


  saveRmf() {
    this.loading = true;
    let url = APP_CONFIG.updateAppRMF;
    this.rmfApplicationDTO.updatedBy = Cookie.get('userName');
    this.httpClient.post(url, this.rmfApplicationDTO)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialog.open("Info", "Rmf has been updated.", false, "OK", "OK")
          .then((result: any) => {
            if (result) {

            }
          }, error => {
            console.log(error);
          })
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }


}
