import { Component, OnInit, NgModule } from '@angular/core';
import { AlertService } from '../alert.service';
import { Chart, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../apiservice.service';
import { infrastructureDashboardDTO } from '../data_model';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.css']
})

@NgModule({ 
  imports: [RouterModule],
  
})
export class InfrastructureComponent implements OnInit {

  public loading : boolean;
  public appServers: any;
  public dBServers :any;
  public otherServers:any;
  public expired:any;
  public notExpired:any;
  public highIncidents: any;
  public mediumIncidents :any;
  public lowIncidents: any;
  public vendorNumbers:any;
  public infraDashboardDTO: infrastructureDashboardDTO;



 public lineChartDataAudits: ChartDataSets<any> = [
    { data: [], label: '' }
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
  constructor(public sideNavService: AlertService, private httpClient: HttpClient, private router: RouterModule) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.infraDashboardDTO = new infrastructureDashboardDTO();
  }





 

  ngOnInit() {
    this.getInfraNumbers();
  
  }

  getInfraNumbers(){
    let url = APP_CONFIG.getInfraNumbers
      this.httpClient.get(url)
        .subscribe((data: any) => {
          this.loading = false;
          this.showGraph=false;
          this.infraDashboardDTO = data;
          this.appServers = this.infraDashboardDTO.appServers;
          this.dBServers = this.infraDashboardDTO.dBServers;
          this.otherServers = this.infraDashboardDTO.otherServers;
          this.expired = this.infraDashboardDTO.expired;
          this.notExpired= this.infraDashboardDTO.notExpired;
          this.highIncidents = this.infraDashboardDTO.highIncident;
          this.mediumIncidents = this.infraDashboardDTO.mediumIncident;
          this.lowIncidents = this.infraDashboardDTO.lowIncident;
          this.vendorNumbers = this.infraDashboardDTO.vendorNumbers;

          // if (this.infraDashboardDTO.vendorNumbers !== undefined && this.infraDashboardDTO.vendorNumbers !== null && this.infraDashboardDTO.vendorNumbers.length > 0) {
            for(var i in this.vendorNumbers){
              this.lineChartLabelsAudits.push(i);
              this.lineChartDataAudits[0].data.push(this.vendorNumbers[i]);
            }
          

          this.showGraph=true;
        }, error => {
          this.loading = false;
          console.log(error);
        });
  }


  chartClicked(value: any) {

  }


}
