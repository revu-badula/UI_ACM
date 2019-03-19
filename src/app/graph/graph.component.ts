import { Component, OnInit } from '@angular/core';
//import { Chart, pattern } from 'chart.js';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public chart: Chart;
  public loading: boolean;
  public pieChartLabels: string[] = ['Low', 'Medium', 'High'];
  public pieChartData: number[] = [30, 40, 63];
  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          }

        }
      ]
    },
  };

  public pieChartLabels2: string[] = ['Fail', 'Pass'];
  public pieChartData2: number[] = [43, 90];
  public pieChartOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
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
          }

        }
      ]
    },
  };

  public pieChartLabels3: string[] = ['Fail', 'Pass'];
  public pieChartData3: number[] = [53, 80];
  public pieChartOptions3 = {
    responsive: true,
    maintainAspectRatio: false,
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
          }

        }
      ]
    },
  };
  public pieChartLabels4: string[] = ['Pass', 'Pending', 'Fail'];
  public pieChartData4: number[] = [];
  public pieChartOptions4 = {
    responsive: true,
    maintainAspectRatio: false,
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
          }

        }
      ]
    },
  };

  public pieChartLabels5: string[] = ['Signed', 'UnSigned'];
  public pieChartData5: number[] = [];
  public pieChartOptions5 = {
    responsive: true,
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
    maintainAspectRatio: false,
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
          }

        }
      ],
      xAxes: [

        {
          id: 'Assessment',
          scaleLabel: {
            display: true,
            labelString: 'Legal',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '20'
          },

          ticks: {
            display: false
          }

        }
      ]
    },
  };

  public pieChartLabels1: string[] = ['High', 'Medium', 'Low'];
  public pieChartData1: number[] = [56, 44, 33];
  public pieChartType: string = 'pie';
  public pieChartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
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
          }

        }
      ]
    },
  };
  // public lineChartDataLocalities: Array<any> = [

  //   '15', '10', '5', '20', '3', '13', '35', '40', '24', '34', '45', '50'

  // ];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30, 24, 34, 45, 50], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90, 15, 10, 5, 20, 3], label: 'Series B' },
    { data: [15, 10, 5, 20, 3, 40, 30, 24, 34, 28, 48, 75], label: 'Series C' }
  ];
  public lineChartDataSystems: Array<any> = [

    '15', '8', '5', '10', '23', '13', '35', '40', '34', '46', '30', '49'

  ];
  public lineChartLabelsLocalities: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabelsSystems: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


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
      backgroundColor: 'rgba(255,255,0)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '	#8A2BE2',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
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
    animation: { animateScale: true, animateRotate: true },
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
          }

        }
      ]
    },
    legend: {
      labels: {
        fontColor: 'red'
      }
    }


  }


  public chartOption1 = {
    responsive: true,
    maintainAspectRatio: false,
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
          }

        }
      ]
    },
    legend: {
      labels: {
        fontColor: 'red'
      }
    }


  }


  public showLoc: boolean;
  public showDev: boolean;
  public showBar: boolean;
  constructor(private httpClient: HttpClient, private router: Router, private utilService: UtilService) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    UtilService.signlegal = false;
    UtilService.pass = false;
    UtilService.pending = false;
  }

  ngOnInit() {
    this.getData5();
    this.getData4();
  }


  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }


  getDataLocalities(value: any) {
    if (value.active.length > 0) {
      console.log(value);
      console.log(value.active[0]._model);
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
      // for (let i = val; i < this.pieChartData5.length; i++) {
      //   res = this.pieChartData5[i];
      //   break;
      // }
      // console.log(res);
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
  getData5() {
    this.pieChartData5 = [];
    this.loading = true;
    let url = APP_CONFIG.getAllTotals;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.pieChartData5.push(data[4], data[5]);
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


 



}
