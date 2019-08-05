import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AlertService } from '../alert.service';
import { NgbdSortableHeader, SortEvent } from '../sort';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public deviceId: any;
  public applications: any;
  public incidents: any;
  public loading: boolean;
  public p: number = 1;
  constructor(public sideNavService: AlertService, private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, private router: Router) {
    sessionStorage.removeItem('incidentName');
    sessionStorage.removeItem("systemName");

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.activatedRoute.params.subscribe(params => {
      this.deviceId = params['id'];

    });

  }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    let url = APP_CONFIG.getServerDetails + "/" + this.deviceId;
    this.loading = true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.applications = data.applicationDTOs;
        this.incidents = data.incidentManagementDTOs;
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        //this.policies = this.toSorting(this.policies, column, direction);

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
  goTo(value: any) {
    sessionStorage.setItem("systemName", value.acronym);
    this.router.navigate(['/system/tab2/info']);
  }
  goToIncident(value: any) {
    sessionStorage.setItem('incidentName', value.incidentId);
    this.router.navigate(['/incident/info']);
  }

}
