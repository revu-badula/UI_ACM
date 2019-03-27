import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { APP_CONFIG } from '../../../app.config';
import { ApiserviceService } from '../../../apiservice.service';
declare let tinymce: any;
@Component({
  selector: 'app-system-technical',
  templateUrl: './system-technical.component.html',
  styleUrls: ['./system-technical.component.css']
})
export class SystemTechnicalComponent {
  public len: any = 0;
  public len1: any = 0;
  public tech:any;
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
  config1: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  constructor(private ref: ChangeDetectorRef, private _apiservice: ApiserviceService) {
    this.getTechnologies();
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
    let w = screen.width;
    if (w > 1475) {
      this.config.width = 1180;
      this.config1.width = 1180;
    }
    else if (w > 1440 && w <= 1475) {
      this.config.width = 1125;
      this.config1.width = 1125;
    }
    else if (w >= 1400 && w <= 1440) {
      this.config.width = 1115;
      this.config1.width = 1115;
    }
    else if (w >= 1310 && w <= 1330) {
      this.config.width = 1050;
      this.config1.width = 1050;
    }
    else if (w >= 1280 && w <= 1309) {
      this.config.width = 1020;
      this.config1.width = 1020;
    }
  }



  ngOnInit() {
  }
  getTechnologies(){
    this._apiservice.getTechnologies()
    .subscribe((data: any) => {
      this.tech = data;
      console.log( this.tech);

    }, error => console.log(error));
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
  }

}
