import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../app.config';
import { Router } from '@angular/router';
import { RMFApplicationDTO } from '../../../../review_DataModel';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../../../dialog.service';
import { Cookie } from 'ng2-cookies';
declare let tinymce: any;
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-systemrmfrecommendations',
  templateUrl: './systemrmfrecommendations.component.html',
  styleUrls: ['./systemrmfrecommendations.component.css']
})
export class SystemrmfrecommendationsComponent implements OnInit {

  public loading: boolean;
  public showEdit: boolean;
  public len: any = 0;
  public len1: any = 0;
  public estDate: any;
  public rmfApplicationDTO: RMFApplicationDTO;
  public users: any;
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
  constructor(private httpClient: HttpClient, private router: Router,
    private datepipe: DatePipe, private dialog: DialogService, private ref: ChangeDetectorRef) {
    this.rmfApplicationDTO = new RMFApplicationDTO();
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };

  }

  ngOnInit() {
    this.getAppId();
   

  }

  getEstDate(value: any) {
    if (value.formatted === "") {
      this.rmfApplicationDTO.estimatedCompletionDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.rmfApplicationDTO.estimatedCompletionDt = moment(latest_date).format();
    }

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


  showRmf() {
    this.router.navigate(['/system/tab2/rmf']);
  }
  valueChanged() {
    this.showEdit = false;
  }

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
      // if (this.rmfApplicationDTO.recomm != undefined) {
      //   let des = this.rmfApplicationDTO.recomendations.replace(/<[^>]+>/gm, '');
      //   this.len = des.length;
      // }
      if (this.rmfApplicationDTO.estimatedCompletionDt === undefined || this.rmfApplicationDTO.estimatedCompletionDt === null) {
        this.estDate = { date: null };
      }
      else {
        let d = new Date(this.rmfApplicationDTO.estimatedCompletionDt);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.estDate = { date: { year: year, month: month, day: day } };
      }


    }, error => {
      this.loading = false;
      console.log(error);
    });

  }


  saveRmf() {
    this.loading = true;
    let url = APP_CONFIG.updateAppRMF;
    this.rmfApplicationDTO.updBy = Cookie.get('userName');
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
