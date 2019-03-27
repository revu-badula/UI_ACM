import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@NgModule({
  imports: [
     FormsModule
  ],
  })


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  public scoreN:any;
  public scoreD:any;
  public weightageN:any;
  public weightageD:any;
  public result:any;
  public realScore:any;

 
  constructor( private _location: Location) { }

  ngOnInit() {
  }


  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  getNum()
  {

  }

  backClicked() {
    this._location.back();
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
