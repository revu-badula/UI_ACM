import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { RMFDetailDTO, RMFPrimaryResponsibilityDTO, RMFSupportingRolesDTO } from '../solutionData';
import { Observable } from 'rxjs';
declare let tinymce: any;
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {

  public rmfDtlID: any;
  public loading: boolean;
  public rmfDetailDTO: RMFDetailDTO;
  public len: any = 0;
  public len1: any = 0;
  public len2: any = 0;
  public len3: any = 0;
  public len4: any = 0;
  public len5: any = 0;
  public len6: any = 0;
  public len7: any = 0;
  public len8: any = 0;
  public len9: any = 0;
  public roles: any;
  public assignOn: any;
  public rolesSupport: any;
  public showForm: boolean = true;
  public plus: boolean = true;
  public closedDate: any;
  public showCloseDate: boolean = false;
  public rmfresponsible: RMFPrimaryResponsibilityDTO;
  public rmfsupport: RMFSupportingRolesDTO;
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
  config3: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config4: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config5: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config6: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config7: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config8: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config9: any = {
    height: 170,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  constructor(private router: Router,
    private route: ActivatedRoute, private httpClient: HttpClient,
    private ref: ChangeDetectorRef, public datepipe: DatePipe, private dialog: DialogService) {
    this.rmfDetailDTO = new RMFDetailDTO();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
    this.config3.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData3(editor);
      });
    };
    this.config4.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData4(editor);
      });
    };
    this.config5.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData5(editor);
      });
    };
    this.config6.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData6(editor);
      });
    };
    this.config7.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData7(editor);
      });
    };
    this.config8.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData8(editor);
      });
    };
    this.config9.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData9(editor);
      });
    };
    this.route.params.subscribe(params => {
      this.rmfDtlID = params['id'];
    });
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.loading = true;
    let url = APP_CONFIG.getRMFDetail;
    let url1 = APP_CONFIG.getRMFRoles;
    let url2 = APP_CONFIG.getUsers;
    Observable.forkJoin(
      this.httpClient.get(url + "?" + "rmfDtlId=" + this.rmfDtlID),
      this.httpClient.get(url1),
      this.httpClient.get(url2)
    ).subscribe((data: any) => {
      this.loading = false;
      this.rmfDetailDTO = data[0];
      this.roles = data[1];
      let rl = this.roles.length;
      let rs = this.roles.slice(0, rl)
      this.rolesSupport = rs;
      this.users = data[2];
      if (this.rmfDetailDTO.outcomes != undefined) {
        let des = this.rmfDetailDTO.outcomes.replace(/<[^>]+>/gm, '');
        this.len = des.length;
      }
      if (this.rmfDetailDTO.potentialInputs != undefined) {
        let des = this.rmfDetailDTO.potentialInputs.replace(/<[^>]+>/gm, '');
        this.len1 = des.length;
      }
      if (this.rmfDetailDTO.discussion != undefined) {
        let des = this.rmfDetailDTO.discussion.replace(/<[^>]+>/gm, '');
        this.len2 = des.length;
      }
      if (this.rmfDetailDTO.expectedOutputs != undefined) {
        let des = this.rmfDetailDTO.expectedOutputs.replace(/<[^>]+>/gm, '');
        this.len3 = des.length;
      }
      if (this.rmfDetailDTO.procedures != undefined) {
        let des = this.rmfDetailDTO.procedures.replace(/<[^>]+>/gm, '');
        this.len4 = des.length;
      }
      if (this.rmfDetailDTO.standards != undefined) {
        let des = this.rmfDetailDTO.standards.replace(/<[^>]+>/gm, '');
        this.len5 = des.length;
      }
      if (this.rmfDetailDTO.guidelines != undefined) {
        let des = this.rmfDetailDTO.guidelines.replace(/<[^>]+>/gm, '');
        this.len6 = des.length;
      }
      if (this.rmfDetailDTO.references != undefined) {
        let des = this.rmfDetailDTO.references.replace(/<[^>]+>/gm, '');
        this.len7 = des.length;
      }

      if (this.rmfDetailDTO.primaryResponsibility != undefined) {
        let des = this.rmfDetailDTO.primaryResponsibility.replace(/<[^>]+>/gm, '');
        this.len8 = des.length;
      }
      if (this.rmfDetailDTO.supportingRoles != undefined) {
        let des = this.rmfDetailDTO.supportingRoles.replace(/<[^>]+>/gm, '');
        this.len9 = des.length;
      }


      if (this.rmfDetailDTO.assignedOn === undefined) {
        this.assignOn = { date: null };
      }
      else {
        let rd = new Date(this.rmfDetailDTO.assignedOn);
        let year = rd.getFullYear();
        let month = rd.getMonth() + 1;
        let day = rd.getDate();
        this.assignOn = { date: { month: month, day: day, year: year } };
      }
    }, error => {
      this.loading = false;
      console.log(error);
    })
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

  getData3(editor: any) {
    this.len3 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len3: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len3 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len3 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len3 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

  getData4(editor: any) {
    this.len4 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len4: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len4 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len4 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len4 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

  getData5(editor: any) {
    this.len5 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len5: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len5 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len5 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len5 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };
  getData6(editor: any) {
    this.len6 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len6: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len6 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len6 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len6 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

  getData7(editor: any) {
    this.len7 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len7: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len7 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len7 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len7 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };


  getData8(editor: any) {
    this.len8 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len8: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len8 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len8 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len8 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };


  getData9(editor: any) {
    this.len9 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len9: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len9 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len9 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len9 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

  getResponsibilityRoles(value: any) {
    if (value === "") {

    }
    else {
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].rmfRoleId === +value) {
          this.rmfresponsible = new RMFPrimaryResponsibilityDTO();
          this.rmfresponsible.rmfRoleId = this.roles[i].rmfRoleId;
          this.rmfresponsible.name = this.roles[i].name;
          this.rmfresponsible.activeStatus = true;
          if (this.rmfDetailDTO.rmfPrimaryResponsibilityDTOs != undefined && this.rmfDetailDTO.rmfPrimaryResponsibilityDTOs.length > 0) {
            this.rmfDetailDTO.rmfPrimaryResponsibilityDTOs.push(this.rmfresponsible);
          }
          else {
            this.rmfDetailDTO.rmfPrimaryResponsibilityDTOs = [];
            this.rmfDetailDTO.rmfPrimaryResponsibilityDTOs.push(this.rmfresponsible);
          }
          this.roles.splice(i, 1);
        }
      }

    }
  }

  getSupportingRoles(value: any) {
    if (value === "") {

    }
    else {
      for (let i = 0; i < this.rolesSupport.length; i++) {
        if (this.rolesSupport[i].rmfRoleId === +value) {
          this.rmfsupport = new RMFSupportingRolesDTO();
          this.rmfsupport.rmfRoleId = this.rolesSupport[i].rmfRoleId;
          this.rmfsupport.name = this.rolesSupport[i].name;
          this.rmfsupport.activeStatus = true;
          if (this.rmfDetailDTO.rmfSupportingRolesDTOs != undefined && this.rmfDetailDTO.rmfSupportingRolesDTOs.length > 0) {
            this.rmfDetailDTO.rmfSupportingRolesDTOs.push(this.rmfsupport);
          }
          else {
            this.rmfDetailDTO.rmfSupportingRolesDTOs = [];
            this.rmfDetailDTO.rmfSupportingRolesDTOs.push(this.rmfsupport);
          }
          this.rolesSupport.splice(i, 1);
        }
      }

    }
  }

  getAssignOn(value: any) {
    if (value.formatted === "") {
      this.rmfDetailDTO.assignedOn = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.rmfDetailDTO.assignedOn = moment(latest_date).format();
    }
  }

  submitDetails() {
    if (this.showCloseDate) {
      this.dialog.open("Info", "Are you sure want to close the task.", true, "Yes", "No")
        .then((result: any) => {
          if (result) {
            this.loading = true;
            let url = APP_CONFIG.saveRMFDetails;
            this.httpClient.post(url, this.rmfDetailDTO)
              .subscribe((data: any) => {
                this.loading = false;
                this.dialog.open("Info", "RMF has been updated.", false, "OK", "Ok")
                  .then((result: any) => {

                  }, error => {
                    console.log(error);
                  });
              }, error => {
                this.loading = false;
                console.log(error);
              });
          }
        }, error => {
          console.log(error);
        })

    }
    else {
      this.loading = true;
      let url = APP_CONFIG.saveRMFDetails;
      this.httpClient.post(url, this.rmfDetailDTO)
        .subscribe((data: any) => {
          this.loading = false;
          this.dialog.open("Info", "RMF has been updated.", false, "OK", "Ok")
            .then((result: any) => {

            }, error => {
              console.log(error);
            });
        }, error => {
          this.loading = false;
          console.log(error);
        })
    }
  }

  changeButton() {
    this.showForm = false;
    this.plus = false;

  }
  getStatus(value: any) {
    this.showCloseDate = false;
    if (value === 'true') {
      this.rmfDetailDTO.status = true;
    }
    else if (value === 'false') {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      this.closedDate = { date: { month: month, day: day, year: year } };
      this.showCloseDate = true;
      this.rmfDetailDTO.status = false;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.rmfDetailDTO.closedDate = moment(latest_date).format();
    }
  }

  getClosedDate(value: any) {
    if (value.formatted === "") {
      this.rmfDetailDTO.closedDate = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.rmfDetailDTO.closedDate = moment(latest_date).format();
    }
  }
}
