import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AlertService } from 'app/alert.service';
import { InfraStructureDTO } from 'app/review_DataModel';
import { infrastructureDashboardDTO } from '../data_model';
import { Observable } from 'rxjs';
import { Chart, ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-infradetails',
  templateUrl: './infradetails.component.html',
  styleUrls: ['./infradetails.component.css']
})
export class InfradetailsComponent implements OnInit {
  public serverType: any;
  public expired: any;
  public notExpired: any;
  public highIncidents: any;
  public loading: boolean;
  public mediumIncidents: any;
  public lowIncidents: any;
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
    private httpClient: HttpClient) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1)
    ).subscribe((data: any) => {
      this.loading = false;
      this.infraStructureDTO = data[0];
      this.infraDashboardDTO = data[1];
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

}
