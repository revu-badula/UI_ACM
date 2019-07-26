import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';

import {Chart, ChartDataSets  } from 'chart.js';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { NgbdSortableHeader, SortEvent } from '../sort';
import { systemDashboardDTO } from '../data_model';
import {SimpleChanges} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {ChangeDetectorRef} from '@angular/core';
import { UtilService } from '../util.service';
import { APP_CONFIG } from '../app.config';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-systemdetails',
  templateUrl: './systemdetails.component.html',
  styleUrls: ['./systemdetails.component.css']
})
export class SystemdetailsComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild(BaseChartDirective) chart1: BaseChartDirective;
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
  public systemsHealth: any;
  public theHigh: boolean = UtilService.theHigh;
  public theMed: boolean = UtilService.theMed;
  public theLow: boolean = UtilService.theLow;
  public systemDashboardDTO : systemDashboardDTO;

  constructor( private _apiservice: ApiserviceService, private router: Router,private cd : ChangeDetectorRef, private utilservice: UtilService, public sideNavService : AlertService) {

    sessionStorage.removeItem("systemName");
    sessionStorage.removeItem("systemActive");
    sessionStorage.removeItem("disabled");
    sessionStorage.removeItem("systemAppAuditId");
    sessionStorage.removeItem("sysassesId");
   }

  ngOnInit() {
    this.getSystemHealth();
    this.getPendingApplications();
    this.getSystemNumbers();
    this.getData();
  }

  goToAudit(value: any) {
 
      sessionStorage.setItem("systemName", value.sysName);
      sessionStorage.setItem("systemActive", "true");
      sessionStorage.setItem("disabled", "false");
      this.router.navigate(['/system/tab2/Audit/sysauditoverview']);
    }


    goToAssessment(value: any) {
 
      sessionStorage.setItem("systemName", value.sysName);
      sessionStorage.setItem("systemActive", "true");
      sessionStorage.setItem("disabled", "false");
      this.router.navigate(['/system/tab2/assessment/sysassessoverview']);
    }


    goToIncident(incidentId: any) {
    
      sessionStorage.setItem('incidentName', incidentId);
      this.router.navigate(['/incident/info']);
     
     
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

  getSystemNumbers(){
    this.loading = true;
    this._apiservice.getSystemNumber()
    .subscribe((data :any) =>  {
      this.loading = false;
      if (data.length === 0) {
        this.systemsHealth = [];
        this.showPagination = false;
      }
      else {
        this.systemDashboardDTO = data;
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });

}

  getSystemNumbersOnClick(type : any , level: any){
    this.loading = true;
    this._apiservice.getSystemNumberOnClick(type , level)
    .subscribe((data :any) =>  {
      this.loading = false;
      if (data.length === 0) {
        this.systemsHealth = [];
        this.showPagination = false;
      }
      else {
        this.systemDashboardDTO = data;
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });

}


  

  getSystemHealth() {

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

  
  toggleVisibilityH(e){

    this.theHigh= e.target.checked;
    console.log("high "+this.theHigh);
    this.getData();
    this.cd.detectChanges();
  }

  toggleVisibilityM(e){

    this.theMed= e.target.checked;
    console.log("med "+this.theMed);
    this.getData();
    this.cd.detectChanges();
  }

  toggleVisibilityL(e){
 
    this.theLow= e.target.checked;
    console.log("Low "+this.theLow);
    this.getData();
    this.cd.detectChanges();
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

        this.lineChartDataSystems15[0].data = [0,0, 0,0,0];
        this.lineChartDataSystems15[1].data = [0,0,0,0,0];
        this.lineChartDataSystems15[2].data = [0,0, 0,0,0];
       
        this.showGraph = false;
        if (this.theHigh) {
          this.lineChartDataSystems15[0].data = this.redData;
          console.log("red "+this.redData);
        }


         if (this.theMed) {
          console.log("yellow "+this.yellowData);
          this.lineChartDataSystems15[1].data = this.yellowData;
         
        }

         if (this.theLow) {
          console.log("green "+this.greenData);
          this.lineChartDataSystems15[2].data = this.greenData;
        }

        this.chartOption15.animation
        this.cd.detectChanges();
        this.totalHigh = data.totalHigh;
        this.totalLow = data.totalLow;
        this.totalModerate = data.totalModerate;
        this.showGraph = true;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  chartClicked(value: any) {
    console.log(value);
    if (value.active.length > 0) {
      let val: any = value.active[0]._index;
      console.log("val "+val);
      var points = [];
      var pointSelected = value.active[0]._chart.tooltip._model.caretX;

      console.log("pointSlected "+pointSelected);
      var legends = value.active[0]._chart.legend.legendItems;
      console.log("legends "+ value.active[0]._index.legend);
      for (var i = 0; i < value.active.length; ++i) {
        points.push(value.active[i]._model.x);
      }

      let position = points.indexOf(pointSelected);
      console.log("position "+position);
      let label = legends[position].text
      let xValue = this.lineChartLabelsSystems15[val];
     
        this.getSystemNumbersOnClick(xValue , label)
        console.log("label"+label);

      }
    
    }

    goTo(value:any){
      sessionStorage.setItem("systemName", value.sysName);
    
      this.router.navigate(['/system/tab2/info']);
    }



  public lineChartDataSystems15: ChartDataSets<any> = [
    { data: [], label: 'High' },
    { data: [], label: 'Medium' },
    { data: [], label: 'Low' }
  ];
  public lineChartLabelsSystems15: Array<any> = ['Audits', 'Assessments', 'Infrastructure', 'Testing', 'Incidents'];
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
          id: 'Audits',
          scaleLabel: {
            display: true,
            labelString: 'Systems',
            fontColor: '#000',
            fontWeight: 'bold',
            fontSize: '12'
          },
          ticks: {
            beginAtZero: true,
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

  public chartColorsSystems15: Array<any> = [
    { // second color
      backgroundColor: '#800000',
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
      backgroundColor: '#008000',
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
}

