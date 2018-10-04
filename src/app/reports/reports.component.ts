import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../util.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

 displayData:number;
 Localities:any;
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {
     

  }

  ngOnInit() {

    this.getLocalityTotal();
    this.getAllMOUs();
  }

  getLocalityTotal(){
      this._apiservice.getLocalityTotal().
      subscribe((data:any) =>{
        this.displayData = data;
      },error => {console.log(error);
      
      } 


      );

  }


  getAllMOUs(){
    this._apiservice.getAllMOUs().
    subscribe((data:any) =>{
      this.Localities = data;
    },error => {console.log(error);
    
    } 


    );

}





  
  
  
  

}
