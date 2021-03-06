import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { Chart, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { APP_CONFIG } from '../app.config';
import { AuditCountDTO } from '../auditcountmodel';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {

  public lineChartDataAsses: ChartDataSets<any> = [
    { data: [], label: 'Assessments for the year' }
  ];
  public lineChartLabelsAsses: Array<any> = [];
  public chartOptionAsses = {
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

  public chartColorsAsses: Array<any> = [
    {
      backgroundColor: '#FF7F50',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }


  ];

  public loading: boolean;
  public auditCountDTo: AuditCountDTO;
  public showGraph: boolean;
  public assessmentDTOs: any;
  public p:number=1;
  constructor(public sideNavService: AlertService,
    private httpClient: HttpClient, private router: Router) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.auditCountDTo = new AuditCountDTO();
    sessionStorage.removeItem("systemActive");
    sessionStorage.removeItem("systemName");
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    let url = APP_CONFIG.getGraphAssessmentsCounts;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.auditCountDTo = data;
        this.assessmentDTOs = data.assessmentDTOs;
        if (this.auditCountDTo.appAuditReports !== undefined && this.auditCountDTo.appAuditReports !== null && this.auditCountDTo.appAuditReports.length > 0) {
          for (let i = 0; i < this.auditCountDTo.appAuditReports.length; i++) {
            this.lineChartLabelsAsses.push(this.auditCountDTo.appAuditReports[i].acronym);
            this.lineChartDataAsses[0].data.push(this.auditCountDTo.appAuditReports[i].count);
          }
        }
        this.showGraph = true;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  chartClicked(value: any) {
    if (value.active.length > 0) {
      sessionStorage.setItem("systemName", value.active[0]._model.label);
      sessionStorage.setItem("systemActive", "true");
      this.router.navigate(['/system/tab2/assessment/sysassessoverview']);
    }
  }

  goTo(value: any) {
    sessionStorage.setItem("systemName", value.appAcronym);
    sessionStorage.setItem("systemActive", "true");
    sessionStorage.setItem("sysassesId", value.assessmentId);
    sessionStorage.setItem("disabled", "false");
    this.router.navigate(['/system/tab2/assessment/Tabs2/first2']);
  }

  getLevelData(level: any) {
    this.assessmentDTOs = [];
    this.loading = true;
    let url = APP_CONFIG.getGraphAssessments + "/" + level;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.assessmentDTOs = data;
      }, error => {
        this.loading = false;
        console.log(error);
      })

  }


}
