import { Component, OnInit } from '@angular/core';
import { Chart, pattern } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public chart1: Chart;
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
  public pieChartLabels4: string[] = ['Fail', 'Pass'];
  public pieChartData4: number[] = [53, 80];
  public pieChartOptions4 = {
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

  public pieChartLabels5: string[] = ['Unsigned', 'Signed'];
  public pieChartData5: number[] = [53, 80];
  public pieChartOptions5 = {
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
  public lineChartDataLocalities: Array<any> = [

    '15', '10', '5', '20', '3', '13', '35', '40', '24', '34', '45', '50'

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
    // { // second color
    //   backgroundColor: 'rgba(255,255,0)',
    //   borderColor: 'rgba(225,10,24,0.2)',
    //   pointBackgroundColor: 'rgba(225,10,24,0.2)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    // },


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
        '#D2691E'
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



  constructor() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
   }

  ngOnInit() {

  }


  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }


  getDataLocalities(value: any) {
    //console.log(value);
    //console.log(value.active[0]._model);
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

  }
  chartClicked5(value: any) {

  }



}
