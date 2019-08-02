import { Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { APP_CONFIG } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { NgbdSortableHeader, SortEvent } from '../../sort';

@Component({
  selector: 'app-policyfamilies',
  templateUrl: './policyfamilies.component.html',
  styleUrls: ['./policyfamilies.component.css']
})
export class PolicyfamiliesComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public loading: boolean = false;
  public famlilies: any;
  public policies: any;
  public auditTypeId:any;
  public p:number=1;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getPolicyFamilies();
  }

  getPolicyFamilies() {
    this.loading = true;
    let url = APP_CONFIG.getPolicyFamilies + "/" + sessionStorage.getItem("policyGrpId");
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.famlilies = data;
        this.loading = false;
        if (sessionStorage.getItem('policiesFamId') !== null) {
          let id = sessionStorage.getItem('policiesFamId');
          this.auditTypeId=id;
          this.selectFamily(id);
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  selectFamily(familyId: any) {
    this.loading = true;
    let url = APP_CONFIG.getPoliciesByFamId + "?policiesByFamId=" + familyId;
    if (sessionStorage.getItem('policiesFamId') !== null) {
      sessionStorage.removeItem('policiesFamId');
    }
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.policies = data;
        this.loading = false;
        sessionStorage.setItem('policiesFamId', familyId);
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
        this.policies = this.toSorting(this.policies, column, direction);
  
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
