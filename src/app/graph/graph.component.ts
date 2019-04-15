import { Component, OnInit } from '@angular/core';
//import { Chart, pattern } from 'chart.js';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public chart: Chart;
  public loading: boolean;
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
          gridLines:{
            display:false
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
          gridLines:{
            display:false
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
          gridLines:{
            display:false
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
          gridLines:{
            display:false
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
  public pieChartData7: number[]=[];
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
            if(data > 0 ){
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
  public pieChartData9: number[] = [5,4];
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
  public pieChartData10: number[] = [4,5];
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
  public pieChartData12: number[] = [9,13];
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
  public pieChartData14: number[] = [5,2];
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
  public pieChartData15: number[] = [7,5];
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
          gridLines:{
            display:false
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
          gridLines:{
            display:false
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
    { data: [4,2,7,9,3,4,7,6,8,10,3,4], label: 'Audits' }

  ];
  public barChartData2: ChartDataSets[] = [
    //{ data: [65, 59, 80, 81, 56, 55, 40, 30, 24, 34, 45, 50],label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    { data: [5, 1, 6, 2, 7, 4, 3, 2, 3, 5, 10, 7], label: 'Recertification' }

  ];
  public barChartData3: ChartDataSets[] = [
    //{ data: [65, 59, 80, 81, 56, 55, 40, 30, 24, 34, 45, 50],label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    { data: [1, 10, 5, 2, 3, 4, 3, 2, 4, 8, 4,10], label: 'Recertification' }

  ];
  public lineChartDataSystems: ChartDataSets<any> = [

    // '15', '8', '5', '10', '23', '13', '35', '40', '34', '46', '30', '49'
    { data: [4,3,6,9,7,8,5,8,9,2,10,6], label: 'Audits' },
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
        boxWidth:10
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
        boxWidth:10
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
  public showRecert:boolean;
  constructor(private httpClient: HttpClient, private router: Router, private utilService: UtilService) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    UtilService.signlegal = false;
    UtilService.pass = false;
    UtilService.pending = false;
    UtilService.signsystem = false;
  }

  ngOnInit() {
    this.getData5();
    //this.getData4();
    //this.getData6();
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

  chartClickedSystems(value:any)
  {
    if (value.active.length > 0) {
      // console.log(value);
      // console.log(value.active[0]._model);
      this.router.navigate(['/upcomingAudit']);
    }
  }
  chartClicked(value: any) {

  }

  chartClicked1(value: any) {

  }
  chartClicked2(value: any) {

  }
  chartClicked3(value: any) {

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
    let year=d.getFullYear();
    Observable.forkJoin(
    this.httpClient.get(url),
    this.httpClient.get(url1+"?"+"yearNumber="+year)
    ).subscribe((data: any) => {
        this.loading = false;
        let dat = data[0];
        this.pieChartData5.push(dat[4], dat[5]);
        this.pieChartData4.push(dat[8], dat[9], dat[10]);
        this.pieChartData6.push(dat[6], dat[7]);
        let reData=data[1].recertificationCountDTO.pastDateCount;
        let reDataF=data[1].recertificationCountDTO.futureDateCount;
        this.pieChartData7.push(reData,reDataF);

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
        this.showRecert=true;
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






}
