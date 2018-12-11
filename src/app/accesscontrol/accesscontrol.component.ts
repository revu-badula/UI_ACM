import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Policy, PolicyDocumentsDTO, PolicyGrp } from '../data_modelPolicy';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-accesscontrol',
  templateUrl: './accesscontrol.component.html',
  styleUrls: ['./accesscontrol.component.css'],
  providers: [ApiserviceService],
})
export class AccesscontrolComponent implements OnInit {
  color: String;
  public loading:boolean=false;
  @ViewChild('content') content: TemplateRef<any>;
  policyAccess: Policy;
  public users:any;
  showForm: boolean = true;
  public endDate: any;
  public showEli:boolean=true;
  public appAuditPolicyId:any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    width: "100%",
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],

  };
  constructor(private _location: Location, private datepipe: DatePipe,
     private activatedRoute: ActivatedRoute, private _apiservice: ApiserviceService) {
    this.policyAccess = new Policy();
   }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.activatedRoute.params.subscribe(params => {
      this.appAuditPolicyId = params['id'];
      this.policyAccess.policyId = params['id'];
    });
    this.getUsers();
  }

  backClicked() {
    this._location.back();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
      this.color = 'offline';
    }

  }

  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

  }

  editorGroup(): void {
    this.showForm = false;
    this.showEli=false;
  }



}
