
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../util.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';

@Component({
  selector: 'app-it-audit',
  templateUrl: './it-audit.component.html',
  styleUrls: ['./it-audit.component.css'],
  providers: [ApiserviceService]
})
export class ItAuditComponent implements OnInit {


  public Audit: any;
  public acronyms: any;
  public auditDate: any;
  public auditDTOs: any = [];
  public loading: boolean = false;
  public desc: boolean = false;
  public auditDt: boolean = false;
  public nextAuditDt: boolean = false;
  public updtBy: boolean = false;
  public updt: boolean = false;
  public p: number = 1;
  public showPagination: boolean = true;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _apiservice: ApiserviceService,
    private modalService: NgbModal, private utilService: UtilService, private httpClient: HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      let type = params['id'];
      this.getAuditsBasedOnScore(type);
    });
    sessionStorage.removeItem("systemName");
    sessionStorage.removeItem("systemActive");
    sessionStorage.removeItem("disabled");
    sessionStorage.removeItem("systemAppAuditId");

  }

  ngOnInit() {

  }

  getAuditsBasedOnScore(id: any) {
    this.loading = true;
    let url = APP_CONFIG.getAuditsBasedOnScore;
    this.httpClient.get(url + "?riskLevel=" + id)
      .subscribe((data: any) => {
        this.loading = false;
        if (data) {
          this.auditDTOs = data;
        }
        else {
          this.auditDTOs = [];
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  goTo(value:any) {
    sessionStorage.setItem("systemName", value.auditName);
    sessionStorage.setItem("systemActive", "true");
    sessionStorage.setItem("disabled", "false");
    sessionStorage.setItem("systemAppAuditId", value.appAuditId);
    this.router.navigate(['/system/tab2/Audit/Tab/first'])
  }


}
