
import { AlertService } from 'app/alert.service';
import { Component, OnInit , ViewChildren,QueryList } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../app.config';
import { AuditCountDTO } from '../auditcountmodel';
import { NgbdSortableHeader, SortEvent } from '../sort';
import { UtilService } from '../util.service';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-newitpm',
  templateUrl: './newitpm.component.html',
  styleUrls: ['./newitpm.component.css']
})
export class NewitpmComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  public redData: any = [];
  public yellowData: any = [];
  public greenData: any = [];
  public showGraph: boolean;
  public loading: boolean;
  public pendingApplications: any;
  public totalHigh: any;
  public totalLow: any;
  public totalModerate: any;
  public p: number = 1;
  public showPagination: boolean = true;
  public systemsHealth : any;

constructor( private _apiservice: ApiserviceService,private router: Router,private utilservice: UtilService, public sideNavService : AlertService) { }

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
      this.totalHigh=data.totalHigh;
      this.totalLow=data.totalLow;
      this.totalModerate=data.totalModerate;
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
    if(xValue === 'Audits'){
    this.router.navigate(['/itpmAudit' + "/" + label + "/" + xValue]);
    }
    if(xValue === 'Assessments')
    {
      this.router.navigate(['/newAssessment']);
    }

    if(xValue === 'Incidents')
    {
      this.router.navigate(['/incidentStart']);
    }
 
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

getSort({ column, direction }: SortEvent) {
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
    else if (header.sortable === column && direction !== '') {
      this.pendingApplications = this.toSorting(this.pendingApplications, column, direction);

    }
  });
}


toSorting(countries: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

compare(v1: any, v2: any) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

getHigh(){
  UtilService.theHigh = true;
  UtilService.theMed = false;
  UtilService.theLow = false;
}
getMed(){
  UtilService.theHigh = false;
  UtilService.theMed = true;
  UtilService.theLow = false;
}
getLow(){
  UtilService.theHigh = false;
  UtilService.theMed = false;
  UtilService.theLow = true;
}
}
