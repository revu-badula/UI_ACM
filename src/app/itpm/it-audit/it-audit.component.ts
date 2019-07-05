
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../util.service';
import { AppAudit } from 'app/data.model.auditDTO';

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
  public updtBy:boolean=false;
  public updt:boolean=false;
  public p: number = 1;
  public showPagination:boolean=true;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private router: Router, private _apiservice: ApiserviceService, private modalService: NgbModal, private utilService: UtilService) {
    sessionStorage.removeItem('AuditmName');
    sessionStorage.removeItem('AuditActive');

  }

  ngOnInit() {

  }

  getAuditsBasedOnScore(id:any){
    this.loading = true;
    this._apiservice.getAuditsBasedOnScore(id)
      .subscribe((data: any) => {
        this.loading = false;
        if (data.length === 0) {
          this.auditDTOs = [];
          this.showPagination = false;
        }
        else {
          this.auditDTOs = data;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


}
