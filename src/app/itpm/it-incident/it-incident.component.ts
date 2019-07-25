import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'app/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'mydatepicker/dist/services/my-date-picker.util.service';
import { ApiserviceService } from 'app/apiservice.service';

@Component({
  selector: 'app-it-incident',
  templateUrl: './it-incident.component.html',
  styleUrls: ['./it-incident.component.css']
})
export class ItIncidentComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public loading: boolean;
  public incidents: any;
  public show:boolean;
  public p:number=1;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _apiservice: ApiserviceService,
    private modalService: NgbModal, private utilService: UtilService, private httpClient: HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      let type = params['id'];
      // this.mainData = params['type'];
      // this.getAuditsBasedOnScore(type,this.mainData);
    });
    sessionStorage.removeItem("systemName");
    sessionStorage.removeItem("systemActive");
    sessionStorage.removeItem("disabled");
    sessionStorage.removeItem("systemAppAuditId");
    sessionStorage.removeItem("sysassesId");

  }


  ngOnInit() {
 
  }

  // getIncidents(id:any) {
  //   this.loading = true;
  //   let url = APP_CONFIG.getIncidentsOnSeverity;
  //   this.httpClient.get(url+ "?severity=" + id)
  //     .subscribe((data: any) => {
  //       this.loading = false;
  //       this.incidents = data;
  //     }, error => {
  //       this.loading = false;
  //       console.log(error);
  //     });

  // }

  viewApplication(incidentId: any) {
    if(!this.show){
    sessionStorage.setItem('incidentName', incidentId);
    this.router.navigate(['/incident/info']);
    }
    else{
      sessionStorage.setItem('incidentName', incidentId);
      this.router.navigate(['/newBusinessImpact/info'])
    }
  }

  createSystem() {
    if(!this.show)
    this.router.navigate(['/incident/info']);
    else{
      this.router.navigate(['/newBusinessImpact/info']);
    }
  }

  getSort({ column, direction }: SortEvent) {
    if(this.incidents !== undefined && this.incidents !==null && this.incidents.length >0)
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if(header.sortable === column && direction !== '') {
        this.incidents = this.toSorting(this.incidents, column, direction);
        
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


}
