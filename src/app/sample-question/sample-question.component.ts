import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';

import { NgModule, enableProdMode } from '@angular/core'



import { NgbModal}from '@ng-bootstrap/ng-bootstrap';

import { UtilService } from '../util.service';
import { Router, ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-sample-question',
  templateUrl: './sample-question.component.html',
  styleUrls: ['./sample-question.component.css']
})

@NgModule({
  declarations: [
 
  ],
  imports: [
   
  ],

})


export class SampleQuestionComponent implements OnInit {




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
