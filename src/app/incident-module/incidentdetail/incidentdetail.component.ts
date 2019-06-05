import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ViewChild, PipeTransform } from '@angular/core';
import { AlertService } from '../../alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { APP_CONFIG } from '../../app.config';
declare let tinymce: any;
import { FormGroup } from '@angular/forms';
import { DecimalPipe, Location } from '@angular/common';
import { IncidentManagementDTO } from '../incident-model';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-incidentdetail',
  templateUrl: './incidentdetail.component.html',
  styleUrls: ['./incidentdetail.component.css']
})
export class IncidentdetailComponent implements OnInit {
  @ViewChild('myForm') myForm: FormGroup;
  public len: number = 0;
  public showEditButton: boolean;
  public test: any;
  public test1: any;
  public loading: boolean = false;
  public systems: any;
  public servers: any;
  public showSystem: boolean = false;
  public showServer: boolean = false;
  public users: any;
  public dummy: any;
  public dbservers: any = [];
  public apps: any = [];
  incidentManagementDTO: IncidentManagementDTO;
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
  public search: any;
  public editMode:boolean=true;
  constructor(private ref: ChangeDetectorRef,
    private alertService: AlertService, private httpClient: HttpClient, private pipe: DecimalPipe, private _location: Location) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.incidentManagementDTO = new IncidentManagementDTO();
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };

  }

  ngOnInit() {
    this.getIncidentInfo();
  }

  getIncidentInfo() {
    if (sessionStorage.getItem('incidentName') === null) {
      this.editMode=false;
      this.alertService.emitChange('true');
      this.getDropdowns();
    }
    else {
      this.showEditButton=true;
      this.alertService.emitChange('false');
      let inId = +sessionStorage.getItem('incidentName');
      this.loading = true;
      let url = APP_CONFIG.getPendingApplications;
      let url1 = APP_CONFIG.getServers;
      let url2 = APP_CONFIG.getIncident;
      Observable.forkJoin(
        this.httpClient.get(url),
        this.httpClient.get(url1),
        this.httpClient.get(url2 + "?incidentId=" + inId)
      ).subscribe((data: any) => {
        this.loading = false;
        this.systems = data[0];
        this.servers = data[1];
        this.incidentManagementDTO=data[2];
      }, error => {
        this.loading = false;
        console.log(error);
      });

    }
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

  getDropdowns() {
    this.loading = true;
    let url = APP_CONFIG.getPendingApplications;
    let url1 = APP_CONFIG.getServers;
    // let url2 = APP_CONFIG.getUsers;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1)
      // this.httpClient.get(url2)
    ).subscribe((data: any) => {
      this.loading = false;
      this.systems = data[0];
      this.servers = data[1];
      // this.users = data[2];
      // this.dummy =  this.users.slice(0,this.users.length)
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  getValue(value: any) {
    this.showServer = false;
    this.showSystem = false;
    if (value == 'server') { this.showServer = true }
    else if (value == 'system') { this.showSystem = true; }
  }
  getData1(value: any) {
    if (value.length >= 3) {
      //this.loading=true;
      let url = APP_CONFIG.searchUser;
      this.httpClient.get(url + "?lastName=" + value)
        .subscribe((data: any) => {
          //this.loading=false;
          this.dummy = data;
        }, error => {
          //this.loading=false;
          console.log(error);
        })
      //this.dummy=this.users.filter((country:any) => this.matches(country, value, this.pipe));
    }
    else {
      this.dummy = [];
    }
  }

  matches(user: any, term: string, pipe: PipeTransform) {
    return user.firstName.toLowerCase().includes(term)
      || user.lastName.toLowerCase().includes(term);
  }

  fillData(value: any) {
    if (this.dummy !== undefined && this.dummy !== null && this.dummy.length > 0) {
      for (let i = 0; i < this.dummy.length; i++) {
        if (this.dummy[i].lastName === value) {
          this.test1 = this.dummy[i].emailId;
          this.incidentManagementDTO.reportedBy = this.dummy[i].firstName + " " + this.dummy[i].lastName;
          this.incidentManagementDTO.userId = this.dummy[i].userId;
        }
      }
    }
  }

  backClicked() {
    this._location.back();
  }
  removeServer(index: number) {
    if (this.incidentManagementDTO.databaseDTOs !== undefined && this.incidentManagementDTO.databaseDTOs !== null && this.incidentManagementDTO.databaseDTOs.length > 0) {
      this.incidentManagementDTO.databaseDTOs.splice(index, 1);
    }
  }

  removeApp(index: number) {
    if (this.incidentManagementDTO.applicationDTOs !== undefined && this.incidentManagementDTO.applicationDTOs !== null && this.incidentManagementDTO.applicationDTOs.length > 0) {
      this.incidentManagementDTO.applicationDTOs.splice(index, 1);
    }
  }
  getServer(id: any) {
    let url = APP_CONFIG.getDBServer;
    if (id !== "") {
      this.httpClient.get(url + '?' + 'a' + '=' + id)
        .subscribe((data: any) => {
          data.serverContactDTOs.filter((item: any) => {
            if (item.isPrimary === true) {
              data.primaryContactName = item.firstName + " " + item.lastName;
            }
          });
          data.serverContactDTOs.filter((item: any) => {
            if (item.isPrimary === false) {
              data.secondaryContactName = item.firstName + " " + item.lastName;
            }
          });
          if (this.incidentManagementDTO.databaseDTOs !== undefined && this.incidentManagementDTO.databaseDTOs.length > 0) {
            this.incidentManagementDTO.databaseDTOs.push(data);
          }
          else {
            this.incidentManagementDTO.databaseDTOs = []
            this.incidentManagementDTO.databaseDTOs.push(data);
          }

        });
    }
  }

  getApplication(name: any) {
    this.loading = true;
    let url = APP_CONFIG.viewApplication;
    this.httpClient.get(url + '?' + 'acronym' + '=' + name)
      .subscribe((data: any) => {
        this.loading = false;
        if (this.incidentManagementDTO.applicationDTOs !== undefined && this.incidentManagementDTO.applicationDTOs.length > 0) {
          this.incidentManagementDTO.applicationDTOs.push(data.applicationViewDTO);
        }
        else {
          this.incidentManagementDTO.applicationDTOs = [];
          this.incidentManagementDTO.applicationDTOs.push(data.applicationViewDTO);
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  getSave() {
    this.loading = true;
    let url = APP_CONFIG.reportIncident;
    this.incidentManagementDTO.createdBy = Cookie.get("userName");
    this.httpClient.post(url, this.incidentManagementDTO)
      .subscribe((data: any) => {
        this.loading = false;
        this.alertService.emitChange('false');
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  editClick()
  {
    //this.showEditButton=false;
    this.editMode=false;
  }


}
