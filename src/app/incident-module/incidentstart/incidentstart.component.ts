import { Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
  public show:boolean;
  constructor(private router: Router, private httpClient: HttpClient,private activatedRoute: ActivatedRoute) {
    sessionStorage.removeItem('incidentName');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let dat = params['type'];
      if(dat !== undefined)
      {
        if(dat === "true")
        {
          this.show=true;
        }
      }
    });
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
