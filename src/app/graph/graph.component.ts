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
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public AuditAssessment: any;
  public auditGram: any;
  public assessmentGram: any;
  public auditRiskLevels: any;
  public loading: boolean;
  public showAudAss: boolean;

  ngOnInit() {
    this.getData5();
    this.getMonthOfAuditAssessment();

  }

  public lineChartDataSystems1: ChartDataSets<any> = [

    { data: [], label: 'Audit' },
    { data: [], label: 'Assessment' },

  ];



  public lineChartLabelsSystems1: Array<any> = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'october', 'November', 'December'];
  public chartOption12 = {
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

  public chartColorsSystems1: Array<any> = [
    { // first color
      backgroundColor: '#8FBC8F',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '#FFA500',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '#8B0000',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },


  ];



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



  public pieChartLabelsWage: string[] = ['Open', 'Closed'];
  public pieChartDataWage: number[] = [2, 3];
  public pieChartOptionsWage = {
    responsive: true,
    maintainAspectRatio: false,
    // title: {
    //   display: true,
    //   text: 'Wage',
    //   position: 'bottom',
    //   fontWeight: 'bold',
    //   color: '#000'
    // },
    legend: {
      labels: {
        fontColor: '#000',
        boxWidth: 10
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            if (data > 0) {
              var w_offset = ctx.measureText(data).width / 2;
              if (data < 5) {
                var h_offset = textSize / 16;
              }
              else {
                var h_offset = textSize / 4;
              }
              //var startAngle = dataset.data[i].startAngle;
              //var endAngle = myPieChart.segments[i].endAngle;
              // var startAngle = 4.71238898038469;
              // var endAngle = 8.47;
              var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
              var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
              ctx.fillStyle = "white";
              var middleAngle = startAngle + ((endAngle - startAngle) / 2);
              var posX = (radius / 2) * Math.cos(middleAngle) + midX;
              var posY = (radius / 2) * Math.sin(middleAngle) + midY;
              if (data < 5) {
                ctx.fillText(data, posX - w_offset, posY - h_offset);
              }
              else {
                ctx.fillText(data, posX + w_offset, posY + h_offset);
              }
            }
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          // ticks: {
          //   display: false,
          // },
          // gridLines:{
          //   display:false
          // }
          display: false

        }
      ],
      xAxes: [

        {
          // id: 'Tickets Type',
          // scaleLabel: {
          //   display: true,
          //   labelString: 'Tickets Type',
          //   fontColor: '#000',
          //   fontWeight: 'bold',
          //   fontSize: '20'
          // },

          // ticks: {
          //   display: false
          // },
          // gridLines:{
          //   display:false
          // }
          display: false

        }
      ]
    },
  };
  pieChartColorWage: any = [
    {
      backgroundColor: [
        '#3CB371',
        '#FFA500',
        '#663399'
        // '#BA55D3'
      ]
    }
  ];

  pieChartColorWage1: any = [
    {
      backgroundColor: ['#66CDAA',
        '#FFD700'
      ]
    }
  ];







  highcharts = Highcharts;
  /*chartOptions = {
    chart: {
      type: "heatmap",
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },
    credits: {
      enabled: false
    },
    title: {
      text: "Systems At Risk"
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      categories: ['Low', 'Medium', 'High'],
      visible: true
    },

    yAxis: {
      categories: ['loc1', 'loc2', 'loc3', 'loc4', 'loc5'],
      title: null,
      // maxColor:'green',
      // minColor:'red',

    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true
        }
      }
    },

    colorAxis: {
      // min: 0,
      // minColor: '#FFFFFF',
      // maxColor: Highcharts.getOptions().colors[4]
      dataClasses: [{
        from: 0,
        to: 10,
        color: '#2b9142',
        name: 'Low'
      }, {
        from: 10,
        to: 20,
        color: '#007bff',
        name: 'Medium'
      }, {
        from: 20,
        to: 100,
        color: '#dc3545',
        name: 'High'
      }]




    },

    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      //symbolHeight: 180,
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> has<br><b>' +
          this.point.value + '</b><br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
      }
    },
    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: [[0, 0, 10],
      [0, 1, 19],
      [0, 2, 8],
      [0, 3, 24],
      [0, 4, 67],
      [1, 0, 92],
      [1, 1, 58],
      [1, 2, 78],
      [1, 3, 20],
      [1, 4, 48],
      [2, 0, 35],
      [2, 1, 15],
      [2, 2, 12],
      [2, 3, 64],
      [2, 4, 52]],
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  };*/



  chartOptions123 = {
    chart: {
      type: "line"
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: null
      },
      allowDecimals: false
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true
        }
      }
    },
    tooltip: {

    },
    legend: {
      align: 'center',
      x: 10,
      verticalAlign: 'bottom',
      y: 22,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 0,
      shadow: false
    },
    series: [{
      name: 'Information Technology',
      lineColor: '#00008B',
      color: '#00008B',
      data: [1, 2, 3, 4, 5, 1, 3, 8, 2, 9, 10, 4],
      marker: {
        symbol: 'circle',
        lineColor: '#00008B',
        fillColor: '#00008B'
      }
    },
    {
      name: 'Operations',
      lineColor: '#A52A2A',
      color: '#A52A2A',
      data: [4, 9, 3, 4, 8, 1, 2, 12, 3, 9, 8, 2],
      marker: {
        symbol: 'circle',
        lineColor: '#A52A2A',
        fillColor: '#A52A2A'
      }
    },
    {
      name: 'Security',
      lineColor: '#DC143C',
      color: '#DC143C',
      data: [3, 7, 6, 2, 5, 11, 2, 1, 3, 7, 2, 4],
      marker: {
        symbol: 'circle',
        lineColor: '#DC143C',
        fillColor: '#DC143C'
      }
    },
    {
      name: 'Financial',
      lineColor: '#006400',
      color: '#006400',
      data: [5, 2, 9, 6, 3, 1, 6, 11, 2, 8, 12, 6],
      marker: {
        symbol: 'circle',
        lineColor: '#006400',
        fillColor: '#006400'
      }
    }]
  };



  chartOptions1234 = {
    chart: {
      type: "column"
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: ['HR Management System', 'Financial Management System', 'Time and Attendance', 'Case Management System', 'Benefit System',
        'Learning Management System', 'Security Training System', 'Payroll System', 'Customer Services', 'Customer Care Portal', 'Provider Operations', 'Member Services']
    },
    yAxis: {
      title: {
        text: null
      },
      allowDecimals: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    tooltip: {

    },
    legend: {
      align: 'center',
      x: 10,
      verticalAlign: 'bottom',
      y: 22,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 0,
      shadow: false
    },
    series: [{
      name: 'High',
      data: [5, 3, 4, 7, 2, 2, 2, 3, 2, 1, 4, 2]
    }, {
      name: 'Medium',
      data: [2, 2, 3, 2, 1, 5, 3, 4, 7, 2, 1, 3]
    }, {
      name: 'Low',
      data: [3, 4, 4, 2, 5, 2, 2, 3, 2, 1, 4, 6]
    }]
  };




  public chart: Chart;
  public pieChartLabels: string[] = ['Low', 'Medium', 'High'];
  public pieChartData: number[] = [3, 2, 5];
  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Localities at Risk',
          scaleLabel: {
            display: true,
            labelString: 'Localities at Risk',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels2: string[] = ['Fail', 'Pass'];
  public pieChartData2: number[] = [3, 5];
  public pieChartOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Audit',
          scaleLabel: {
            display: true,
            labelString: 'Audit',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels3: string[] = ['Fail', 'Pass'];
  public pieChartData3: number[] = [3, 8];
  public pieChartOptions3 = {
    responsive: true,
    maintainAspectRatio: false,

    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            ctx.fontWeight = "bold";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    showTooltips: false,
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Assessment',
          scaleLabel: {
            display: true,
            labelString: 'Assessment',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#000'
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    }
  };
  public pieChartLabels4: string[] = ['Pass', 'Pending', 'Fail'];
  public pieChartData4: number[] = [];
  public pieChartOptions4 = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle + 0.2;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle + 0.6;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    tooltips: {
      mode: 'point'
    },
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Assessment',
          scaleLabel: {
            display: true,
            labelString: 'Vulnerability Scan',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels5: string[] = ['Signed', 'UnSigned'];
  public pieChartData5: number[] = [];
  public pieChartOptions5 = {
    // title:{
    //   display: true,
    //       text: 'Legal Documents',
    //       position: 'top',
    //       fontWeight: 'bold'
    // },
    responsive: true,
    showTooltips: false,
    // tooltips: {
    //   mode: 'point'
    // },
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Legal Documents',
          scaleLabel: {
            display: true,
            labelString: 'Legal Documents (MOUs, MOAs and other Legal Documents)',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '15'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels7: string[] = ['Past Dates', 'Future Dates'];
  public pieChartData7: number[] = [];
  // = [3, 5];
  public pieChartOptions7 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            if (data > 0) {
              var w_offset = ctx.measureText(data).width / 2;
              var h_offset = textSize / 4;
              //var startAngle = dataset.data[i].startAngle;
              //var endAngle = myPieChart.segments[i].endAngle;
              // var startAngle = 4.71238898038469;
              // var endAngle = 8.47;
              var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
              var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
              ctx.fillStyle = "white";
              var middleAngle = startAngle + ((endAngle - startAngle) / 2);
              var posX = (radius / 2) * Math.cos(middleAngle) + midX;
              var posY = (radius / 2) * Math.sin(middleAngle) + midY;
              ctx.fillText(data, posX + w_offset, posY + h_offset);
            }
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Recertification Status',
          scaleLabel: {
            display: true,
            labelString: 'Recertification Status',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels8: string[] = ['Past Dates', 'Future Dates'];
  public pieChartData8: number[] = [7, 2];
  public pieChartOptions8 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Solution Dates',
          scaleLabel: {
            display: true,
            labelString: 'Solution Dates',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };



  public pieChartLabels9: string[] = ['Past Dates', 'Future Dates'];
  public pieChartData9: number[] = [5, 4];
  public pieChartOptions9 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Vulnerability Dates',
          scaleLabel: {
            display: true,
            labelString: 'Vulnerability Dates',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };



  public pieChartLabels10: string[] = ['Past Dates', 'Future Dates'];
  public pieChartData10: number[] = [4, 5];
  public pieChartOptions10 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Policy Dates',
          scaleLabel: {
            display: true,
            labelString: 'Policy Dates',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels11: string[] = ['Open', 'Close'];
  public pieChartData11: number[] = [5, 8];
  public pieChartOptions11 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Policies',
          scaleLabel: {
            display: true,
            labelString: 'Policies',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };



  public pieChartLabels12: string[] = ['Past Dates', 'Future Dates'];
  public pieChartData12: number[] = [9, 13];
  public pieChartOptions12 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Audit Dates',
          scaleLabel: {
            display: true,
            labelString: 'Audit Dates',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels13: string[] = ['Open', 'Close'];
  public pieChartData13: number[] = [5, 8];
  public pieChartOptions13 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Audit',
          scaleLabel: {
            display: true,
            labelString: 'Audit',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };



  public pieChartLabels14: string[] = ['Open', 'Close'];
  public pieChartData14: number[] = [5, 2];
  public pieChartOptions14 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Assessment',
          scaleLabel: {
            display: true,
            labelString: 'Assessment',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };


  public pieChartLabels15: string[] = ['Past Dates', 'Future Dates'];
  public pieChartData15: number[] = [7, 5];
  public pieChartOptions15 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Assessment Dates',
          scaleLabel: {
            display: true,
            labelString: 'Assessment Dates',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabelsTask: string[] = ['Open', 'Closed'];
  public pieChartDataTask: number[] = [4, 6];
  pieChartColorTask: any = [
    {
      backgroundColor: [
        '#DC143C',
        '#7FFF00'
      ]
    }
  ];
  public pieChartOptionsTask = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'My Tasks',
          scaleLabel: {
            display: true,
            labelString: 'My Tasks',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '15'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };




  public pieChartLabels6: string[] = ['Signed', 'UnSigned'];
  public pieChartData6: number[] = [];
  public pieChartOptions6 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Legal Documents',
          scaleLabel: {
            display: true,
            labelString: 'Legal Documents (MOUs,MOAs and other Legal Documents)',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '15'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels1: string[] = ['High(50-75)%', 'Medium(75-90)%', 'Low(90-100)%'];
  public pieChartData1: number[] = [4, 2, 3];
  public pieChartType: string = 'pie';
  public pieChartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: '#000',
        boxWidth: 10
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      duration: 2000,
      "onComplete": function () {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        //ctx.textBaseline = 'bottom';
        ctx.fontWeight = "bold";
        var textSize = chartInstance.width / 10;
        var radius = chartInstance.outerRadius;
        var midX = chartInstance.width / 2;
        var midY = chartInstance.height / 2
        this.data.datasets.forEach((dataset: any, i: any) => {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: any) => {
            let data = dataset.data[index];
            var w_offset = ctx.measureText(data).width / 2;
            var h_offset = textSize / 4;
            //var startAngle = dataset.data[i].startAngle;
            //var endAngle = myPieChart.segments[i].endAngle;
            // var startAngle = 4.71238898038469;
            // var endAngle = 8.47;
            var startAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.startAngle;
            var endAngle = chartInstance.controller.getDatasetMeta(i).data[index]._model.endAngle;
            ctx.fillStyle = "white";
            var middleAngle = startAngle + ((endAngle - startAngle) / 2);
            var posX = (radius / 2) * Math.cos(middleAngle) + midX;
            var posY = (radius / 2) * Math.sin(middleAngle) + midY;
            ctx.fillText(data, posX + w_offset, posY + h_offset);
          });
        });
      }

    },
    scales: {
      display: false,
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            // labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false
          }

        }
      ],
      xAxes: [

        {
          id: 'Systems at Risk',
          scaleLabel: {
            display: true,
            labelString: 'Systems at Risk',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }

        }
      ]
    },
  };
  // public lineChartDataLocalities: Array<any> = [

  //   '15', '10', '5', '20', '3', '13', '35', '40', '24', '34', '45', '50'

  // ];

  public barChartData: ChartDataSets[] = [
    //{ data: [65, 59, 80, 81, 56, 55, 40, 30, 24, 34, 45, 50],label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    { data: [4, 2, 7, 9, 3, 4, 7, 6, 8, 10, 3, 4], label: 'Audits' }

  ];
  public barChartData2: ChartDataSets[] = [
    //{ data: [65, 59, 80, 81, 56, 55, 40, 30, 24, 34, 45, 50],label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    { data: [5, 1, 6, 2, 7, 4, 3, 2, 3, 5, 10, 7], label: 'Recertification' }

  ];
  public barChartData3: ChartDataSets[] = [
    //{ data: [65, 59, 80, 81, 56, 55, 40, 30, 24, 34, 45, 50],label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    { data: [1, 10, 5, 2, 3, 4, 3, 2, 4, 8, 4, 10], label: 'Recertification' }

  ];
  public lineChartDataSystems: ChartDataSets<any> = [

    // '15', '8', '5', '10', '23', '13', '35', '40', '34', '46', '30', '49'
    { data: [4, 3, 6, 9, 7, 8, 5, 8, 9, 2, 10, 6], label: 'Audits' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    // { data: [15, 10, 5, 20, 3, 40, 30, 24, 34, 28, 48, 75], label: 'Series C' }
  ];
  public lineChartDataAudit: ChartDataSets<any> = [

    // '15', '8', '5', '10', '23', '13', '35', '40', '34', '46', '30', '49'
    { data: [6, 9, 8, 1, 5, 4, 3, 2, 4, 3, 5, 10], label: 'Audits' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    // { data: [15, 10, 5, 20, 3, 40, 30, 24, 34, 28, 48, 75], label: 'Series C' }
  ];
  public lineChartDataAssess: ChartDataSets<any> = [

    // '15', '8', '5', '10', '23', '13', '35', '40', '34', '46', '30', '49'
    { data: [3, 9, 10, 1, 6, 5, 4, 3, 2, 4, 4, 5], label: 'Assessments' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    // { data: [15, 10, 5, 20, 3, 40, 30, 24, 34, 28, 48, 75], label: 'Series C' }
  ];
  public lineChartLabelsLocalities: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabelsSystems: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabelsPolicies: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabelsAudit: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabelsAssess: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public chartColorsLocalities: Array<any> = [
    { // first color
      backgroundColor: '#6495ED',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '#8A2BE2',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },


  ];

  public chartColorsLocalities2: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];
  public chartColorsPolicies: Array<any> = [
    { // second color
      backgroundColor: '#A52A2A',
      borderColor: '#A52A2A',
      pointBackgroundColor: '#A52A2A',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#A52A2A'
    },
  ];
  public chartColorsAudit: Array<any> = [
    { // second color
      backgroundColor: '#90EE90',
      borderColor: '#90EE90',
      pointBackgroundColor: '#90EE90',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#90EE90'
    },
  ];
  public chartColorsAssess: Array<any> = [
    { // second color
      backgroundColor: '#FF7F50',
      borderColor: '#FF7F50',
      pointBackgroundColor: '##FF7F50',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FF7F50'
    },
  ];
  pieChartColor: any = [
    {
      backgroundColor: ['#FF7F50',
        '#006400',
        '#008B8B',
      ]
    }
  ];

  pieChartColor2: any = [
    {
      backgroundColor: ['#F08080',
        '#FFD700'
      ]
    }
  ];

  pieChartColor3: any = [
    {
      backgroundColor: ['#000080',
        '#00FA9A'
      ]
    }
  ];
  pieChartColor4: any = [
    {
      backgroundColor: ['#66CDAA',
        '#D2691E',
        '#C71585'
      ]
    }
  ];
  pieChartColor5: any = [
    {
      backgroundColor: ['#66CDAA',
        '#FFD700'
      ]
    }
  ];
  pieChartColor6: any = [
    {
      backgroundColor: [
        // '#A52A2A',
        // '#D2691E'
        '#66CDAA',
        '#FFD700'
      ]
    }
  ];

  pieChartColor7: any = [
    {
      backgroundColor: ['#663399',
        '#FA8072'
      ]
    }
  ];
  pieChartColor8: any = [
    {
      backgroundColor: [
        '#FF4500',
        '#6B8E23'
      ]
    }
  ];

  pieChartColor9: any = [
    {
      backgroundColor: [
        '#00008B',
        '#FF8C00'
      ]
    }
  ];

  pieChartColor10: any = [
    {
      backgroundColor: [
        '#2E8B57',
        '#6A5ACD'
      ]
    }
  ];

  pieChartColor11: any = [
    {
      backgroundColor: [
        '#40E0D0',
        '#663399'
      ]
    }
  ];
  pieChartColor12: any = [
    {
      backgroundColor: [
        '#B8860B',
        '#9370DB'
      ]
    }
  ];
  pieChartColor13: any = [
    {
      backgroundColor: [
        '#808000',
        '#DB7093'
      ]
    }
  ];
  pieChartColor14: any = [
    {
      backgroundColor: [
        '#D2691E',
        '#6495ED'
      ]
    }
  ];

  pieChartColor15: any = [
    {
      backgroundColor: [
        '#008B8B',
        '#BDB76B'
      ]
    }
  ];
  pieChartColor1: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
      ]
    }
  ];


  public chartColorsSystems: Array<any> = [
    { // first color
      backgroundColor: '#8FBC8F',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    // { // second color
    //   backgroundColor: 'rgba(255,255,0)',
    //   borderColor: 'rgba(225,10,24,0.2)',
    //   pointBackgroundColor: 'rgba(225,10,24,0.2)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    // },


  ];
  public chartOption = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      // animateScale: true, 
      // animateRotate: true
      duration: 2000,
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
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }

    },
    scales: {
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // },
          ticks: {
            beginAtZero: true,
            // callback: (value: any) => {
            //   if (value === 20)
            //     return 'Low';
            //   else if (value === 50)
            //     return 'Medium';
            //   else if (value === 80)
            //     return 'High';
            //   else
            //     return '';
            // }
          }
        }
      ],
      xAxes: [

        {
          id: 'Upcoming Audits for Localities',
          scaleLabel: {
            display: true,
            labelString: 'Upcoming Audits for Localities',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // }


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



  public chartOption5 = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      // animateScale: true, 
      // animateRotate: true
      duration: 2000,
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
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }

    },
    scales: {
      yAxes: [
        {
          id: 'Assessments',
          scaleLabel: {
            display: true,
            labelString: 'Assessments',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // },
          ticks: {
            beginAtZero: true,
            // callback: (value: any) => {
            //   if (value === 20)
            //     return 'Low';
            //   else if (value === 50)
            //     return 'Medium';
            //   else if (value === 80)
            //     return 'High';
            //   else
            //     return '';
            // }
          }
        }
      ],
      xAxes: [

        {
          id: 'Upcoming Assessments',
          scaleLabel: {
            display: true,
            labelString: 'Upcoming Assessments',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // }


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



  public chartOption3 = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      // animateScale: true, 
      // animateRotate: true
      duration: 2000,
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
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }

    },
    scales: {
      yAxes: [
        {
          id: 'Recertification',
          scaleLabel: {
            display: true,
            labelString: 'Recertification',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // },
          ticks: {
            beginAtZero: true,
            // callback: (value: any) => {
            //   if (value === 20)
            //     return 'Low';
            //   else if (value === 50)
            //     return 'Medium';
            //   else if (value === 80)
            //     return 'High';
            //   else
            //     return '';
            // }
          }
        }
      ],
      xAxes: [

        {
          id: 'Upcoming Policies for Recertification',
          scaleLabel: {
            display: true,
            labelString: 'Upcoming Policies for Recertification',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // }


        }
      ]
    },
    legend: {
      labels: {
        fontColor: '#000'
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    }


  };


  public chartOption4 = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      // animateScale: true, 
      // animateRotate: true
      duration: 2000,
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
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }

    },
    scales: {
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // },
          ticks: {
            beginAtZero: true,
            // callback: (value: any) => {
            //   if (value === 20)
            //     return 'Low';
            //   else if (value === 50)
            //     return 'Medium';
            //   else if (value === 80)
            //     return 'High';
            //   else
            //     return '';
            // }
          }
        }
      ],
      xAxes: [

        {
          id: 'Upcoming Audits',
          scaleLabel: {
            display: true,
            labelString: 'Upcoming Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // }


        }
      ]
    },
    legend: {
      labels: {
        fontColor: '#000'
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    }


  };


  public chartOption2 = {
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      onHover: function (e: any) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    animation: {
      // animateScale: true, 
      // animateRotate: true
      duration: 2000,
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
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }

    },
    scales: {
      yAxes: [
        {
          id: 'Recertification',
          scaleLabel: {
            display: true,
            labelString: 'Recertification',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // },
          ticks: {
            beginAtZero: true,
            // callback: (value: any) => {
            //   if (value === 20)
            //     return 'Low';
            //   else if (value === 50)
            //     return 'Medium';
            //   else if (value === 80)
            //     return 'High';
            //   else
            //     return '';
            // }
          }
        }
      ],
      xAxes: [

        {
          id: 'Upcoming Recertification',
          scaleLabel: {
            display: true,
            labelString: 'Upcoming Recertification',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          // gridLines: {
          //   display: false
          // }


        }
      ]
    },
    legend: {
      labels: {
        fontColor: '#000'
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    }


  }


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
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    scales: {
      yAxes: [
        {
          id: 'Audits',
          scaleLabel: {
            display: true,
            labelString: 'Audits',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },
          ticks: {
            beginAtZero: true,
            // callback: (value: any) => {
            //   if (value === 20)
            //     return 'Low';
            //   else if (value === 50)
            //     return 'Medium';
            //   else if (value === 90)
            //     return 'High';
            //   else
            //     return '';
            // }
          }
        }
      ],
      xAxes: [

        {
          id: 'Upcoming Audits for Systems',
          scaleLabel: {
            display: true,
            labelString: 'Upcoming Audits for Systems',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },


        }
      ]
    },
    legend: {
      labels: {
        fontColor: '#000'
      },
      onHover: (e: any) => {
        e.target.style.cursor = 'pointer';
      }
    }


  }


  public showLoc: boolean;
  public showDev: boolean;
  public showBar: boolean;
  public showSystem: boolean;
  public showRecert: boolean;
  public showHover: boolean;
  @ViewChild('emailView') emailView: ElementRef;
  public myNotifications = [{ "createdOn": "2019-06 - 03", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2989, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2919", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 30", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2981, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 30", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2978, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 30", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2975, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 29", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2713, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 29", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2712, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 29", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2709, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2699, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2697, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2694, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2690, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2683, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2648, "sentBy": 0, "to": 0, "subject": "System Access Termination Requested", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 28", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2644, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 23", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2612, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2258", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 23", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2611, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2258", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 23", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2609, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": false, "sentFrom": "Jacob Blake" }, { "createdOn": "2019 - 05 - 23", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2602, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2258", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 22", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2600, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2563, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2538", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2561, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2559, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2538", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2546, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2538", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2545, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2538", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2542, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 21", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2533, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": true, "sentFrom": "Vineeth Gadde" }, { "createdOn": "2019 - 05 - 20", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2508, "sentBy": 0, "to": 0, "subject": "New Onboard Request", "unRead": false, "sentFrom": "Vineeth Gadde" }, { "createdOn": "2019 - 05 - 20", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2481, "sentBy": 0, "to": 0, "subject": "Employee Onboard Request", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 20", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2472, "sentBy": 0, "to": 0, "subject": "Employee Onboard Request", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 20", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2456, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2440", "unRead": false, "sentFrom": "Vineeth Gadde" }, { "createdOn": "2019 - 05 - 20", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2443, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2440", "unRead": false, "sentFrom": "Mike Cary" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2436, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2434, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2432, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2430, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": false, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2428, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2425, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": true, "sentFrom": "Sunny Singh" }, { "createdOn": "2019 - 05 - 17", "createdBy": 0, "updatedBy": 0, "receivedEmailId": 2423, "sentBy": 0, "to": 0, "subject": "Requested - Ticket ID 2401", "unRead": true, "sentFrom": "Sunny Singh" }];

  constructor(private httpClient: HttpClient, private router: Router,
    private utilService: UtilService, private modalService: NgbModal, private _apiservice: ApiserviceService, ) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    UtilService.signlegal = false;
    UtilService.pass = false;
    UtilService.pending = false;
    UtilService.signsystem = false;
  }








  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }


  getDataLocalities(value: any) {
    if (value.active.length > 0) {
      this.router.navigate(['/upcomingAudit']);
    }
  }

  chartClickedSystems(value: any) {
    if (value.active.length > 0) {
      // console.log(value);
      // console.log(value.active[0]._model);
      this.router.navigate(['/upcomingAudit']);
    }
  }
  chartClicked(value: any) {

  }

  chartClickedTask(value: any) {

  }

  chartClicked1(value: any) {

  }
  chartClicked2(value: any) {

  }
  chartClicked3(value: any) {

  }
  chartClickedSystems1(value: any) {

  }
  chartClickedWage(value: any) {

  }
  chartClicked4(value: any) {

    if (value.active.length > 0) {
      let val: any = value.active[0]._index;
      let res: any
      // for (let i = val; i < this.pieChartData5.length; i++) {
      //   res = this.pieChartData5[i];
      //   break;
      // }
      // console.log(res);
      if (val === 0) {
        UtilService.pass = true;
        this.router.navigate(['/rdevice']);
      }
      else if (val === 1) {
        UtilService.pending = true;
        this.router.navigate(['/rdevice']);
      }
      else {
        this.router.navigate(['/rdevice']);
      }
    }
  }
  chartClicked5(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;
      let res: any
      if (val === 0) {
        UtilService.signlegal = true;
        this.router.navigate(['/rlegal']);
      }
      else {
        this.router.navigate(['/rlegal']);
      }
    }

    // let data1 = [
    //   {
    //     "signedLocalities": 3
    //   },
    //   {
    //     "unSignedLocalities": 2
    //   },
    // ];
    // let resu:any;
    // for(let i=val;i<data1.length;i++)
    // {
    //   resu = data1[i];
    //   break;
    // }
    // console.log(resu);
  }

  chartClicked6(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;
      let res: any
      if (val === 0) {
        UtilService.signsystem = true;
        this.router.navigate(['/rsystems']);
      }
      else {
        this.router.navigate(['/rsystems']);
      }
    }
  }

  chartClicked7(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked8(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked9(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked10(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked11(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked12(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked13(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked14(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  chartClicked15(value: any) {
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;

    }
  }
  getData5() {
    this.pieChartData5 = [];
    this.loading = true;
    let url = APP_CONFIG.getAllTotals;
    let url1 = APP_CONFIG.getLocalityGraphDetails;
    let d = new Date();
    let year = d.getFullYear();
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1 + "?" + "yearNumber=" + year)
    ).subscribe((data: any) => {
      this.loading = false;
      let dat = data[0];
      this.pieChartData5.push(dat[4], dat[5]);
      this.pieChartData4.push(dat[8], dat[9], dat[10]);
      this.pieChartData6.push(dat[6], dat[7]);
      let reData = data[1].recertificationCountDTO.pastDateCount;
      let reDataF = data[1].recertificationCountDTO.futureDateCount;
      this.pieChartData7.push(reData, reDataF);

      // let data1 = [
      //   {
      //     "signedLocalities": 3
      //   },
      //   {
      //     "unSignedLocalities": 2
      //   },
      //   //   // {
      //   //   "signedSystems": 4
      //   // },
      //   // {
      //   //   "unSignedSystems": 5
      //   // }
      //   3,2,4,5
      //];
      // for (let i = 0; i < data1.length; i++) {
      //   if (data1[i].signedLocalities != undefined)
      //     this.pieChartData5.push(data1[i].signedLocalities);
      //   else
      //     this.pieChartData5.push(data1[i].unSignedLocalities);
      //this.pieChartData5.push(data1[i]);
      //}
      this.showLoc = true;
      this.showDev = true;
      this.showSystem = true;
      this.showRecert = true;
    }, error => {
      this.loading = false;
      console.log(error);
    });




  }

  getData4() {
    this.pieChartData4 = [];
    this.loading = true;
    let url = APP_CONFIG.getAllTotals;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.pieChartData4.push(data[8], data[9], data[10]);
        // let data1 = [
        //   {
        //     "signedLocalities": 3
        //   },
        //   {
        //     "unSignedLocalities": 2
        //   },
        //   //   // {
        //   //   "signedSystems": 4
        //   // },
        //   // {
        //   //   "unSignedSystems": 5
        //   // }
        //   3,2,4,5
        //];
        // for (let i = 0; i < data1.length; i++) {
        //   if (data1[i].signedLocalities != undefined)
        //     this.pieChartData5.push(data1[i].signedLocalities);
        //   else
        //     this.pieChartData5.push(data1[i].unSignedLocalities);
        //this.pieChartData5.push(data1[i]);
        //}
        this.showDev = true;
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }


  appendData(label: any, data: any) {
    this.barChartData.push({
      label: 'test',
      data: [10, 12, 2, 51, 31, 21, 24, 35, 66, 77, 11, 28]
    });

    console.log(this.barChartData);
    this.showBar = true;
  }

  getData6() {
    this.pieChartData6 = [];
    this.loading = true;
    let url = APP_CONFIG.getAllTotals;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.pieChartData6.push(data[6], data[7]);
        // let data1 = [
        //   {
        //     "signedLocalities": 3
        //   },
        //   {
        //     "unSignedLocalities": 2
        //   },
        //   //   // {
        //   //   "signedSystems": 4
        //   // },
        //   // {
        //   //   "unSignedSystems": 5
        //   // }
        //   3,2,4,5
        //];
        // for (let i = 0; i < data1.length; i++) {
        //   if (data1[i].signedLocalities != undefined)
        //     this.pieChartData5.push(data1[i].signedLocalities);
        //   else
        //     this.pieChartData5.push(data1[i].unSignedLocalities);
        //this.pieChartData5.push(data1[i]);
        //}
        this.showSystem = true;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getMonthOfAuditAssessment() {
    this.loading = true;
    this._apiservice.getMonthOfAuditAssessment()
      .subscribe((data: any) => {
        this.loading = false;
        this.AuditAssessment = data;
        this.auditGram = this.AuditAssessment[0];
        this.assessmentGram = this.AuditAssessment[1];
        // for (let i = 0; i < this.auditGram.length; i++) {
        //   this.lineChartDataSystems1[0].data.push(this.auditGram[i]);
        // }
        this.lineChartDataSystems1[0].data=this.auditGram;
        this.lineChartDataSystems1[1].data=this.assessmentGram;
        // for (let i = 0; i < this.assessmentGram.length; i++) {
        //   this.lineChartDataSystems1[1].data.push(this.assessmentGram[i]);
        // }
        this.showAudAss = true;

      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  getAllAuditRiskLevels() {
    this._apiservice.getAllAuditRiskLevels()
      .subscribe((data: any) => {
        this.auditRiskLevels = data;
        console.log(this.auditGram);

      }, error => console.log(error));

  }


  getNotification() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(this.emailView, ngbModalOptions);

  }


}
