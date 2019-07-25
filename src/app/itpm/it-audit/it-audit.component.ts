
import { Component, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../util.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { NgbdSortableHeader, SortEvent } from '../../sort';
import { Location } from '@angular/common';

@Component({
  selector: 'app-it-audit',
  templateUrl: './it-audit.component.html',
  styleUrls: ['./it-audit.component.css'],
  providers: [ApiserviceService]
})
export class ItAuditComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
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
  public mainData: any;
  public showType: boolean;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _apiservice: ApiserviceService,
    private modalService: NgbModal,private _location: Location, private utilService: UtilService, private httpClient: HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      let type = params['id'];
      this.mainData = params['type'];
      this.getAuditsBasedOnScore(type, this.mainData);
    });
    sessionStorage.removeItem("systemName");
    sessionStorage.removeItem("systemActive");
    sessionStorage.removeItem("disabled");
    sessionStorage.removeItem("systemAppAuditId");
    sessionStorage.removeItem("sysassesId");

  }

  ngOnInit() {

  }

  getAuditsBasedOnScore(id: any, type: any) {
    this.loading = true;
    let url: any;
    if (type === "Audits") {
      url = APP_CONFIG.getAuditsBasedOnScore;
    }
    else if (type === "Assessments") {
      this.showType = true;
      url = APP_CONFIG.getAssessmentsBasedOnScore;
    }
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

  goTo(value: any) {
    if (this.mainData === "Audits") {
      sessionStorage.setItem("systemName", value.appAcronym);
      sessionStorage.setItem("systemActive", "true");
      sessionStorage.setItem("disabled", "false");
      sessionStorage.setItem("systemAppAuditId", value.appAuditId);
      this.router.navigate(['/system/tab2/Audit/Tab/first']);
    }
    else if (this.mainData === "Assessments") {
      sessionStorage.setItem("systemName", value.appAcronym);
      sessionStorage.setItem("systemActive", "true");
      sessionStorage.setItem("sysassesId", value.assessmentId);
      sessionStorage.setItem("disabled", "false");
      this.router.navigate(['/system/tab2/assessment/Tabs2/first2']);
    }
  }

  getSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        this.auditDTOs = this.toSorting(this.auditDTOs, column, direction);

      }
    });
  }


  toSorting(countries: any[], column: string, direction: string): any[] {
    if (direction === '') {
      return countries;
    } else {
      return [...countries].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  compare(v1: any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  backClicked() {
    this._location.back();
  }


}
