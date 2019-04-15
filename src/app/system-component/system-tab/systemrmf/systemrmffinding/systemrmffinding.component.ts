import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../app.config';
import { Router } from '@angular/router';
import { RMFApplicationDTO } from '../../../../review_DataModel';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../../../dialog.service';
import { Cookie } from 'ng2-cookies';
declare let tinymce: any;

@Component({
  selector: 'app-systemrmffinding',
  templateUrl: './systemrmffinding.component.html',
  styleUrls: ['./systemrmffinding.component.css']
})
export class SystemrmffindingComponent implements OnInit {
  public loading: boolean;
  public showEdit: boolean=true;
  public len: any = 0;
  public len1: any = 0;
  public rmfApplicationDTO: RMFApplicationDTO;
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

  showOnPageLoad() {

    this.loading = true;
    let id = sessionStorage.getItem('systemRmfId');
    let rmfid = +id;
    let url = APP_CONFIG.getAppRMF;
    this.httpClient.get(url + "?" + "rmfAppId=" + rmfid)
      .subscribe((data: any) => {
        this.loading = false;
        this.rmfApplicationDTO = data;
        if (this.rmfApplicationDTO.findingComments != undefined) {
          let des = this.rmfApplicationDTO.findingComments.replace(/<[^>]+>/gm, '');
          this.len = des.length;
        }
        // if (this.rmfApplicationDTO.auditFindings != undefined) {
        //   let des = this.rmfApplicationDTO.auditFindings.replace(/<[^>]+>/gm, '');
        //   this.len1 = des.length;
        // }
      }, error => {
        this.loading = false;
        console.log(error);
      });

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
