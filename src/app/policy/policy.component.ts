import { Component, OnInit, ViewChildren, QueryList, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { Chart } from 'chart.js';
import { NgbdSortableHeader, SortEvent } from '../sort';
import { DecimalPipe } from '@angular/common';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public openCount: any;
  public closeCount: any;
  public searchTerm: any;
  public policyOpenCount: any;
  public policyuCloseCount: any;
  public showAllSystem: boolean;
  public policyMonthReports: any = [];
  public policyGrps: any = [];
  public policies: any = [];
  public showPolicyGrp: boolean = false;
  public showPolicies: boolean = false;
  public showTable: boolean;
  public lineChartPoliciesLables: Array<any> = [];
  public p: number = 1;
  public loading:boolean;
  public lineChartPolicies: Array<any> = [{ data: [], label: 'Data' }];
  public chartOption1 = {
    responsive: true,
    maintainAspectRatio: false,
    showTooltips: false,
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 1000,
      "onComplete": function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach((dataset: any, i: any) => {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            var data = dataset.data[index];
            if (data > 0) {
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            }
          });
        });
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 1,

          },
          display: true
        }
      ],
      xAxes: [

        {
          // id: 'Upcoming Audits for Systems',
          // scaleLabel: {
          //   //display: true,
          //   // labelString: 'Upcoming Audits for Systems',
          //   fontColor: '#000',
          //   fontWeight:'bold',
          //   fontSize:5
          // },
          barThickness: 25,
          display: true,
          gridLines: {
            display: true

          },
          ticks: {
            fontSize: 10
          }


        }
      ]
    },
    legend: {
      labels: {
        fontColor: '#000',
        boxWidth: 10
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    }


  };

  public chartColorsSystems: Array<any> = [
    { // first color
      backgroundColor: '#8FBC8F',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }


  ];


  constructor(private _apiservice: ApiserviceService,
    public sideNavService: AlertService, private router: Router, private pipe: DecimalPipe) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading=true;
    this._apiservice.getPolicyCount(2019)
      .subscribe((data: any) => {
        this.loading=false;
        this.openCount = data.openCount;
        this.closeCount = data.closeCount;
        this.policyOpenCount = data.policyOpenCount;
        this.policyuCloseCount = data.policyuCloseCount;
        this.policyMonthReports = data.policyMonthReportDTOs;
        if (this.policyMonthReports !== undefined && this.policyMonthReports !== null && this.policyMonthReports.length > 0) {
          for (let i = 0; i < this.policyMonthReports.length; i++) {
            this.lineChartPoliciesLables.push(this.policyMonthReports[i].monthName);
            this.lineChartPolicies[0].data.push(this.policyMonthReports[i].count)
          }
        }
        this.showAllSystem = true;
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  getSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        if (this.policies.length > 0) {
          this.policies = this.toSorting(this.policies, column, direction);
        }
        else if (this.policyGrps.length > 0) {
          this.policyGrps = this.toSorting(this.policyGrps, column, direction);
        }

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
  getData1(value: any) {
    // this.dummyData = this.searchResults.filter((country: any) => this.matches(country, value, this.pipe));
    // this.total = this.dummyData.length;
  }

  matches(country: any, term: string, pipe: PipeTransform) {
    return country.firstName.toLowerCase().includes(term.toLowerCase())
      || country.lastName.toLowerCase().includes(term.toLowerCase());
  }

  getPolicyGrpData(value: any) {
    this.policies = [];
    this.loading=true;
    this._apiservice.policyGrpOnstatus(value)
      .subscribe((data: any) => {
        this.policyGrps = data;
        this.showPolicyGrp = true;
        this.showPolicies = false;
        this.showTable = true;
        this.loading=false;
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  getPolicyData(value: any) {
    this.policyGrps = [];
    this.loading=true;
    this._apiservice.getPolicyAssignment(value)
      .subscribe((data: any) => {
        this.policies = data;
        this.showPolicyGrp = false;
        this.showPolicies = true;
        this.showTable = true;
        this.loading=false;
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  getTable1() {
    this.showTable = !this.showTable;
  }

  loadPolicies(id: any) {
    sessionStorage.setItem("policyGrpId", id);
    this.router.navigate(['/firstpolicy/details']);
  }

}
