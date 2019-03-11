import { Component, OnInit } from '@angular/core';

import { IMyDpOptions } from 'mydatepicker';

import { NgbModal}from '@ng-bootstrap/ng-bootstrap';

import { UtilService } from '../util.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sample-question',
  templateUrl: './sample-question.component.html',
  styleUrls: ['./sample-question.component.css']
})
export class SampleQuestionComponent implements OnInit {

  

  constructor(private modalService: NgbModal,private utilService:UtilService,private route: ActivatedRoute) { }

  ngOnInit() {
  
 
  }




    
  
  

  
}
