import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Router } from '@angular/router';
import { infrastructureDashboardDTO, inciDashboardDTO } from '../data_model';
import { NgbdSortableHeader, SortEvent } from '../sort';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public loading : boolean;
  public criticalHighInci: any;
  public criticalMediumInci :any;
  public criticalLowInci:any;
  public openIncident:any;
  public closedIncident:any;
  public highIncidents:any;
  public mediumIncidents:any;
  public lowIncidents:any;
  public businessesImpacted:any;
  public systemsImpacted:any;
  public inciDashboardDTO: inciDashboardDTO;
  public infraDashboardDTO: infrastructureDashboardDTO;
  public typesOfIncident:any;
  public incidents: any;
  public show:boolean;
  public p:number=1;

 public lineChartDataAudits: ChartDataSets<any> = [
    { data: [] }
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
            userCallback: function(label, index, labels) {
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

  public showGraph: boolean;
  constructor(public sideNavService: AlertService, private httpClient: HttpClient, private router: Router) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.inciDashboardDTO = new inciDashboardDTO();
    sessionStorage.removeItem('incidentName');

  }


  ngOnInit() {
    this.getInciNumbers();
    this.getInfraNumbers();
    this.getIncidents();

  
  }

  goToSystemDetails(){
    this.router.navigate(['/newSystemDetails']);
  }

  getInciNumbers(){
    let url = APP_CONFIG.getInciNumbers
      this.httpClient.get(url)
        .subscribe((data: any) => {
          this.loading = false;
          this.showGraph=false;
          this.inciDashboardDTO = data;
          this.criticalHighInci = this.inciDashboardDTO.criticalHighInci;
          this.criticalMediumInci = this.inciDashboardDTO.criticalMediumInci;
          this.criticalLowInci= this.inciDashboardDTO.criticalLowInci;
          this.openIncident = this.inciDashboardDTO.openIncident;
          this.closedIncident= this.inciDashboardDTO.closedIncident;
          this.businessesImpacted=this.inciDashboardDTO.businessesImpacted;
          this.systemsImpacted = this.inciDashboardDTO.systemsImpacted;
          this.typesOfIncident = this.inciDashboardDTO.typesOfIncident;
          for(var i in this.typesOfIncident){
            this.lineChartLabelsAudits.push(i);
            this.lineChartDataAudits[0].data.push(this.typesOfIncident[i]);
            console.log(i);
            console.log(this.typesOfIncident[i]);
          }
          this.showGraph=true;
         
        }, error => {
          this.loading = false;;
          console.log(error);
        });
  }


  getInfraNumbers(){
    let url = APP_CONFIG.getInfraNumbers
      this.httpClient.get(url)
        .subscribe((data: any) => {
          this.loading = false;
        
          this.infraDashboardDTO = data;
          
          this.highIncidents = this.infraDashboardDTO.highIncident;
          this.mediumIncidents = this.infraDashboardDTO.mediumIncident;
          this.lowIncidents = this.infraDashboardDTO.lowIncident;
      
        }, error => {
          this.loading = false;;
          console.log(error);
        });
  }
  chartClicked(value: any) {

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