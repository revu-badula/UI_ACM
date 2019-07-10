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

  public redData: any = [];
  public yellowData: any = [];
  public greenData: any = [];
  public showGraph: boolean;
  public loading: boolean;
  public pendingApplications: any;
    public p: number = 1;
    public showPagination:boolean=true;
public systemsHealth : any;
  constructor(private router: Router, private _apiservice: ApiserviceService) { }
  ngOnInit() {
    this.getData();
    this.getSystemHealth();
    this.getPendingApplications();
  }
  
  
  getPendingApplications() {
      this.loading = true;
      this._apiservice.getPendingApplications()
        .subscribe((data: any) => {
          this.loading = false;
          if (data.length === 0) {
            this.pendingApplications = [];
            this.showPagination = false;
          }
          else {
            this.pendingApplications = data;
          }
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
  
  getSystemHealth()
  {

      this.loading = true;
      this._apiservice.getSystemsHealth()
        .subscribe((data: any) => {
          this.loading = false;
          if (data.length === 0) {
            this.systemsHealth = [];
            this.showPagination = false;
          }
          else {
            this.systemsHealth = data;
          }
        }, error => {
          this.loading = false;
          console.log(error);
        });

    
  }

  getData() {
    this.loading = true;
    this._apiservice.getSystemsHealthCount()
      .subscribe((data: any) => {
        this.loading = false;
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

        this.lineChartDataSystems15[0].data = this.redData;
        this.lineChartDataSystems15[1].data = this.yellowData;
        this.lineChartDataSystems15[2].data = this.greenData;
        this.showGraph = true;
      }, error => {
        this.loading = false;
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
      let xValue = this.lineChartLabelsSystems15[val];
      this.router.navigate(['itpmAudit' + "/" + label + "/" + xValue]);
    }




  }


  public lineChartDataSystems15: ChartDataSets<any> = [
    { data: [], label: 'High' },
    { data: [], label: 'Medium' },
    { data: [], label: 'Low' }
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
