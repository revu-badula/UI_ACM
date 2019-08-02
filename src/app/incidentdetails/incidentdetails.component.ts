import { Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { AlertService } from 'app/alert.service';
import { NgbdSortableHeader, SortEvent } from '../sort';

@Component({
  selector: 'app-incidentdetails',
  templateUrl: './incidentdetails.component.html',
  styleUrls: ['./incidentdetails.component.css']
})
export class IncidentdetailsComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  public p: number = 1;
  public loading: boolean;
  public criticalHighInci: any;
  public criticalMediumInci: any;
  public criticalLowInci: any;
  public openIncident:any;
  public closedIncident:any;
  constructor(public sideNavService: AlertService) { }

  ngOnInit() {
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


}
