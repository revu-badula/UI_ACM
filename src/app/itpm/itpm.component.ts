import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/heatmap';
import { ApiserviceService } from '../apiservice.service';

ExportingModule(Highcharts);

@Component({
  selector: 'app-itpm',
  templateUrl: './itpm.component.html',
  styleUrls: ['./itpm.component.css']
})
export class ITPMComponent implements OnInit {

  constructor(private router: Router, private _apiservice: ApiserviceService) { }

  public redData: any = [];
  public yellowData: any = [];
  public greenData: any = [];
  ngOnInit() {
    this.getData();
  }

  getData() {
    this._apiservice.getSystemsHealthCount()
      .subscribe((data: any) => {
        this.redData.push(data.auditHigh);
        this.redData.push(data.assessmentHigh);
        this.redData.push(data.infraStructureHigh);
        this.redData.push(data.testingHigh);
        this.redData.push(data.incidentHigh);
        this.yellowData.push(data.auditModerate);
        this.yellowData.push(data.assessmentModerate);
        this.yellowData.push(0);
        this.yellowData.push(0);
        this.yellowData.push(data.incidentModerate);

        this.greenData.push(data.auditLow);
        this.greenData.push(data.assessmentLow);
        this.greenData.push(data.infraStructureLow);
        this.greenData.push(data.testingLow);
        this.greenData.push(data.incidentLow);

        this.lineChartDataSystems15 = [{ data: this.redData, label: 'High' },
        { data: this.yellowData, label: 'Medium' },
        { data: this.greenData, label: 'Low' },
        ]

      }, error => {
        console.log(error);
      });
  }

  chartClicked(value: any) {
    //console.log(value);
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;
      //console.log(val);
      var points = [];
      var pointSelected = value.active[0]._chart.tooltip._model.caretX;
      var legends = value.active[0]._chart.legend.legendItems;
      for (var i = 0; i < value.active.length; ++i) {
        points.push(value.active[i]._model.x);
      }
      let position = points.indexOf(pointSelected);
      let label = legends[position].text
      this.router.navigate(['itpmAudit' + "/" + label]);
    }




  }


  public lineChartDataSystems15: ChartDataSets<any> = [
    { data: ['4', '2', '10', '5', '4', '6', '8', '1', '9', '2', '11', '7'], label: 'High' },
    { data: ['7', '1', '6', '2', '8', '3', '4', '3', '8', '2', '1', '6'], label: 'Medium' },
    { data: ['2', '3', '1', '5', '6', '9', '2', '2', '5', '3', '7', '2'], label: 'Low' }
  ];
  public lineChartLabelsSystems15: Array<any> = ['Audits', 'Assessments', 'InfraStructure', 'Testing', 'Incidents'];
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
