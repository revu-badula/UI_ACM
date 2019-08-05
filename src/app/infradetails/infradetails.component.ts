import { Component, OnInit, ViewChildren, QueryList, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AlertService } from 'app/alert.service';
import { InfraStructureDTO } from 'app/review_DataModel';
import { infrastructureDashboardDTO } from '../data_model';
import { Observable } from 'rxjs';
import { Chart, ChartDataSets } from 'chart.js';
import { NgbdSortableHeader, SortEvent } from '../sort';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-infradetails',
  templateUrl: './infradetails.component.html',
  styleUrls: ['./infradetails.component.css']
})
export class InfradetailsComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public serverType: any;
  public expired: any;
  public notExpired: any;
  public highIncidents: any;
  public loading: boolean;
  public mediumIncidents: any;
  public p: number = 1;
  public searchTerm: any;
  public pageSize: number = 10;
  public total: number = 0;
  public lowIncidents: any;
  public dummyData: any;
  public showFlag: boolean;
  public highTestResults: any;
  public medTestResults: any;
  public lowTestResults: any;
  public highComplianceCheck: any;
  public lowComplianceCheck: any;
  public infraStructures: any = [];
  public vendorNumbers: any;
  public showGraph: boolean;
  public infraDashboardDTO: infrastructureDashboardDTO;
  public assetTotal: any;
  public infraStructureDTO: InfraStructureDTO;
  //public infraStructureDTO1: InfraStructureDTO;
  public lineChartDataAudits: ChartDataSets<any> = [
    { data: [], label: 'Vendors' }
  ];
  public lineChartLabelsAudits: Array<any> = [];
  public chartOptionAudits = {
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
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }

            },
          },
          display: true
        }
      ],
      xAxes: [

        {
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

  public chartColorsAudits: Array<any> = [
    {
      backgroundColor: '#008B8B',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }


  ];

  constructor(private activatedRoute: ActivatedRoute, public sideNavService: AlertService,
    private httpClient: HttpClient, private pipe: DecimalPipe, private router: Router) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    sessionStorage.removeItem('incidentName');
    this.infraStructureDTO = new InfraStructureDTO();
    this.infraDashboardDTO = new infrastructureDashboardDTO();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.serverType = params['type'];

    });

    this.getPageData();
  }

  getInfraNumbers() {
    let url = APP_CONFIG.getInfraNumbers;
    this.loading = true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.infraDashboardDTO = data;
        this.assetTotal = this.infraDashboardDTO.appServers + this.infraDashboardDTO.dBServers + this.infraDashboardDTO.otherServers;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getServerDetails(type: any) {

    this.serverType = type;
    this.getPageData();
  }

  getPageData() {
    let url = APP_CONFIG.getInfraDetails + "/" + this.serverType;
    let url1 = APP_CONFIG.getInfraNumbers;
    this.loading = true;
    this.dummyData = [];
    this.showFlag = false;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1)
    ).subscribe((data: any) => {
      this.loading = false;
      this.infraStructureDTO = data[0];
      this.dummyData = this.infraStructureDTO.servers.slice(0, this.infraStructureDTO.servers.length);
      this.infraDashboardDTO = data[1];
      this.total = this.infraStructureDTO.servers.length;
      this.assetTotal = this.infraDashboardDTO.appServers + this.infraDashboardDTO.dBServers + this.infraDashboardDTO.otherServers;
      for (let i in this.infraDashboardDTO.vendorNumbers) {
        this.lineChartLabelsAudits.push(i);
        this.lineChartDataAudits[0].data.push(this.infraDashboardDTO.vendorNumbers[i]);
      }
      this.showGraph = true;

    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  getSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        this.infraStructureDTO.servers = this.toSorting(this.infraStructureDTO.servers, column, direction);

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
    this.infraStructureDTO.servers = this.dummyData.filter((country: any) => this.matches(country, value, this.pipe));
    this.total = this.infraStructureDTO.servers.length;
  }
  matches(country: any, term: string, pipe: PipeTransform) {
    return country.hostName.toLowerCase().includes(term.toLowerCase())
      || country.primaryContact.toLowerCase().includes(term.toLowerCase());
  }

  pageChanged(value: any) {
    if (this.searchTerm !== undefined && this.searchTerm !== null && this.searchTerm !== "") {
      this.p = value;
      let data = this.dummyData.filter((country: any) => this.matches(country, this.searchTerm, this.pipe));
      this.infraStructureDTO.servers = data.slice((value - 1) * this.pageSize, (value - 1) * this.pageSize + this.pageSize);

    }
    else {
      this.p = value;
      this.infraStructureDTO.servers = this.dummyData.slice((value - 1) * this.pageSize, (value - 1) * this.pageSize + this.pageSize);
    }
  }

  getExpired(value: any, showFlag: boolean = false) {
    this.loading = true;
    this.showFlag = showFlag;
    this.dummyData = [];
    let url = APP_CONFIG.getInfraData;
    let mainurl: any;
    if (this.serverType === 'Application Server') {
      mainurl = url + "/app/" + value;
    }
    else if (this.serverType === 'Database Server') {
      mainurl = url + "/db/" + value;
    }
    else if (this.serverType === 'Others') {
      mainurl = url + "/others/" + value;
    }

    this.httpClient.get(mainurl)
      .subscribe((data: any) => {
        this.loading = false;
        this.infraStructureDTO.servers = [];
        this.infraStructureDTO.servers = data;
        this.dummyData = this.infraStructureDTO.servers.slice(0, this.infraStructureDTO.servers.length);
        this.total = this.infraStructureDTO.servers.length;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  getIncident(id: any) {

    sessionStorage.setItem('incidentName', id);
    this.router.navigate(['/incident/info']);

  }

  chartClicked(value: any) {
    this.showFlag=false;
    if (value.active.length > 0) {
      let vendor = value.active[0]._model.label;
      let url = APP_CONFIG.getInfraOnVendor;
      this.loading = true;
      this.httpClient.get(url + "/" + vendor)
        .subscribe((data: any) => {
          this.loading = false;
          this.infraStructureDTO.servers = [];
          this.infraStructureDTO.servers = data;
          this.dummyData = this.infraStructureDTO.servers.slice(0, this.infraStructureDTO.servers.length);
          this.total = this.infraStructureDTO.servers.length;
        }, error => {
          this.loading = false;
          console.log(error);
        })
    }

  }


}
