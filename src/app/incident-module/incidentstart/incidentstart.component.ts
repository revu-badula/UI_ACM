import { Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { NgbdSortableHeader, SortEvent } from '../sort';
@Component({
  selector: 'app-incidentstart',
  templateUrl: './incidentstart.component.html',
  styleUrls: ['./incidentstart.component.css']
})
export class IncidentstartComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public loading: boolean;
  public incidents: any;
  constructor(private router: Router, private httpClient: HttpClient) {
    sessionStorage.removeItem('incidentName');
  }

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents() {
    this.loading = true;
    let url = APP_CONFIG.getAllIncidents;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.incidents = data;
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  viewApplication(incidentId: any) {
    sessionStorage.setItem('incidentName', incidentId);
    this.router.navigate(['/incident/info']);
  }

  createSystem() {
    this.router.navigate(['/incident/info']);
  }

  getSort({ column, direction }: SortEvent) {
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
