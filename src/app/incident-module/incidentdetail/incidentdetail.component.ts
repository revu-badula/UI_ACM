import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '../../alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../app.config';
declare let tinymce: any;

@Component({
  selector: 'app-incidentdetail',
  templateUrl: './incidentdetail.component.html',
  styleUrls: ['./incidentdetail.component.css']
})
export class IncidentdetailComponent implements OnInit {

  public len: number = 0;
  public showEditButton: boolean;
  public test: any;
  public loading: boolean = false;
  public systems: any;
  public servers: any;
  public showSystem:boolean=false;
  public showServer:boolean=false;
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
  constructor(private ref: ChangeDetectorRef,
    private alertService: AlertService, private httpClient: HttpClient) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
  }

  ngOnInit() {
    this.getDropdowns();
  }

  getData(editor: any) {
    this.len = 0;
    //this.alertService.emitChange('false');
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

  getDropdowns() {
    this.loading = true;
    let url = APP_CONFIG.getPendingApplications;
    let url1 = APP_CONFIG.getServers;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1)
    ).subscribe((data: any) => {
      this.loading = false;
      this.systems = data[0];
      this.servers = data[1];
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  getValue(value:any)
  {
    this.showServer=false;
    this.showSystem=false;
    if(value == 'server'){this.showServer=true}
    else if(value == 'system'){this.showSystem=true;}
  }


}
