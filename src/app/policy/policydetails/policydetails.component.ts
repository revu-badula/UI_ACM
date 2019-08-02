import { Component, OnInit } from '@angular/core';
import { PolicyGrp, Policy, PolicyDocumentsDTO, PolicyReviewTerm, familyPOlicyDTO } from '../data_model_policy';
declare let tinymce: any;
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../app.config';
import { Observable } from 'rxjs';
import { policyService } from '../policy-service';
import { AlertService } from '../../alert.service';
@Component({
  selector: 'app-policydetails',
  templateUrl: './policydetails.component.html',
  styleUrls: ['./policydetails.component.css']
})
export class PolicydetailsComponent implements OnInit {

  public policyGrpData: PolicyGrp;
  public policyDisplay: PolicyGrp;
  public policyReview: PolicyReviewTerm;
  public loading: boolean = false;
  public family: familyPOlicyDTO;
  public users: any;
  public plus:boolean = true;
  public p: number = 1;
  public showForm: boolean = true;
  public families: any;
  public policies: any;
  public updatedAt: any;
  public showDownload: boolean = false;
  public lastReviewDate: any;
  public nextReviewDate: any;
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
  public len: any = 0;
  public policyReviewTerm: any[] = [{ id: 1, reviewTerm: "Yearly" },
  { id: 2, reviewTerm: "Half-Yearly" },
  { id: 3, reviewTerm: "Quarterly" }];
  constructor(public sideNavService: AlertService, private httpClient: HttpClient, private policyService: policyService) {
    this.policyGrpData = new PolicyGrp();
    this.policyDisplay = new PolicyGrp();
    this.policyReview = new PolicyReviewTerm();
    this.family = new familyPOlicyDTO();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.policyService.show();
    sessionStorage.removeItem('policiesFamId');
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    let url = APP_CONFIG.getUsers;
    this.loading = true;
    let url1 = APP_CONFIG.fetchPolicies;
    let id = +sessionStorage.getItem("policyGrpId");
    let url2 = APP_CONFIG.fetchPolicyFamily;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1 + '?' + 'policyGrpId' + '=' + id),
      this.httpClient.get(url2 + '?' + 'policyGrpId' + '=' + id)
    ).subscribe((data: any) => {
      this.loading = false;
      this.users = data[0];
      this.policyDisplay = data[1].policyGrpDTO;
      this.families = data[2];
      if (this.policyDisplay.description != undefined) {
        let des = this.policyDisplay.description.replace(/<[^>]+>/gm, '');
        this.len = des.length;
      }
      this.policies = data[1].policyDTOs;
      if (data[1].policyDTOs != undefined && data[1].policyDTOs.length > 0) {
        this.showDownload = true;
      }
      this.policyGrpData = data[1].policyGrpDTO;
      let dt = new Date(this.policyGrpData.updatedTs);
      let month = dt.getMonth() + 1;
      let day = dt.getDate();
      let year = dt.getFullYear();
      this.updatedAt = month + "/" + day + "/" + year;
      if (this.policyDisplay.lastReviewDate != null) {
        let d = new Date(this.policyDisplay.lastReviewDate);
        this.lastReviewDate = {
          date: {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          }
        }
      }
      else {
        this.lastReviewDate = null;
      }
      if (this.policyDisplay.policyReviewDate !== null) {
        let rd = new Date(this.policyDisplay.policyReviewDate);
        this.nextReviewDate = {
          date: {
            year: rd.getFullYear(),
            month: rd.getMonth() + 1,
            day: rd.getDate()
          }
        }
      }
      else {
        this.nextReviewDate = null;
      }
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
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len = 0;
    }
    else {
      this.len = tinymce.activeEditor.getContent({ format: 'text' }).length;
    }
  };

  updatePolicyGrp()
  {

  }
}
