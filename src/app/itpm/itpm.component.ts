import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';
import { ApiserviceService } from '../apiservice.service';
import { Observable } from 'rxjs';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/heatmap';
ExportingModule(Highcharts);

@Component({
  selector: 'app-itpm',
  templateUrl: './itpm.component.html',
  styleUrls: ['./itpm.component.css']
})
export class ITPMComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  public lineChartDataSystems15: ChartDataSets<any> = [
                                                       { data: ['4', '2', '10', '5', '4', '6', '8', '1', '9', '2', '11', '7'], label: 'High' },
                                                       { data: ['7', '1', '6', '2', '8', '3', '4', '3', '8', '2', '1', '6'], label: 'Medium' },
                                                       { data: ['2', '3', '1', '5', '6', '9', '2', '2', '5', '3', '7', '2'], label: 'Low' }
                                                     ];
  public lineChartLabelsSystems15: Array<any> = ['HR Management System', 'Financial Management System', 'Time and Attendance', 'Case Management System', 'Benefit System',
   'Learning Management System', 'Security Training System', 'Payroll System', 'Customer Services', 'Customer Care Portal', 'Provider Operations', 'Member Services'];
  public chartOption15 = {
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
                // id: 'Audits',
                // scaleLabel: {
                //   display: true,
                //   labelString: 'Audits',
                //   fontColor: '#000',
                //   fontWeight: 'bold',
                //   fontSize: '20'
                // },
                ticks: {
                  beginAtZero: true,
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
  
  public chartColorsSystems15: Array<any> = [
             { // second color
               backgroundColor: '#FF7F50',
               borderColor: 'rgba(225,10,24,0.2)',
               pointBackgroundColor: 'rgba(225,10,24,0.2)',
               pointBorderColor: '#fff',
               pointHoverBackgroundColor: '#fff',
               pointHoverBorderColor: 'rgba(225,10,24,0.2)'
             },
             { // second color
               backgroundColor: '#FFD700',
               borderColor: 'rgba(225,10,24,0.2)',
               pointBackgroundColor: 'rgba(225,10,24,0.2)',
               pointBorderColor: '#fff',
               pointHoverBackgroundColor: '#fff',
               pointHoverBorderColor: 'rgba(225,10,24,0.2)'
             },
             { // second color
               backgroundColor: '#008B8B',
               borderColor: 'rgba(225,10,24,0.2)',
               pointBackgroundColor: 'rgba(225,10,24,0.2)',
               pointBorderColor: '#fff',
               pointHoverBackgroundColor: '#fff',
               pointHoverBorderColor: 'rgba(225,10,24,0.2)'
             }
           ];
  chartClickedSystems1(value: any) {

  }
}
