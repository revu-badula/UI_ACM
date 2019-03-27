import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';

import { NgModule, enableProdMode } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { NgbModal}from '@ng-bootstrap/ng-bootstrap';

import { UtilService } from '../util.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
FusionChartsModule.fcRoot(FusionCharts, Charts)


const data = {
  "chart": {
    "caption": "Evidence",
    "subcaption": "",
    "showvalues": "1",
    "showpercentintooltip": "0",
    "numberprefix": "",
    "enablemultislicing": "1",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Pass",
      "value": "30"
    },
    {
      "label": "Fail",
      "value": "23"
    },
    // {
    //   "label": "Bullion",
    //   "value": "180000"
    // },
    // {
    //   "label": "Real-estate",
    //   "value": "270000"
    // },
    // {
    //   "label": "Insurance",
    //   "value": "20000"
    // }
  ]
};

@Component({
  selector: 'app-sample-question',
  templateUrl: './sample-question.component.html',
  styleUrls: ['./sample-question.component.css']
})

@NgModule({
  declarations: [
 
  ],
  imports: [
    BrowserModule,
    FusionChartsModule // Include in imports
  ],

})


export class SampleQuestionComponent implements OnInit {
  data: Object;
  width = 400;
  height = 300;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource = data;



  constructor(private modalService: NgbModal,private utilService:UtilService,private route: ActivatedRoute, private _location: Location) {
    
   }

  ngOnInit() {

 
  }
  
 
  

  getColor(){}

  getOpacity(){}

  backClicked() {
    this._location.back();
  }

  public scoreN:any;
  public scoreD:any;
  public weightageN:any;
  public weightageD:any;
  public result:any;
  public realScore:any;

  getNum()
  {

  }

 


  getDem()
  {
    this.result=this.weightageN/this.weightageD;
    console.log(this.result);
  }

  getRealScore()
  {
    let res = this.result*this.scoreN;
    this.realScore=res;

  }

  
}
