import { Directive, OnInit, OnDestroy, HostListener,Input, ElementRef, Renderer2 } from '@angular/core';
import { NgControl,AbstractControl } from '@angular/forms';

@Directive({
  selector: '[phoneMask]'
})
export class PhoneMaskDirective implements OnInit, OnDestroy {

  // constructor(public ngControl: NgControl) { }

  // ngOnInit() {

  // }
  // @HostListener('ngModelChange', ['$event'])
  // onModelChange(event: any) {
  //   this.onInputChange(event, false);
  // }

  // @HostListener('keydown.backspace', ['$event'])
  // keydownBackspace(event:any) {
  //   this.onInputChange(event.target.value, true);
  // }


  // onInputChange(event:any, backspace:any) {
  //   let newVal = event.replace(/\D/g, '');
  //   if (backspace && newVal.length <= 6) {
  //     newVal = newVal.substring(0, newVal.length - 1);
  //   }
  //   if (newVal.length === 0) {
  //     newVal = '';
  //   } else if (newVal.length <= 3) {
  //     newVal = newVal.replace(/^(\d{0,3})/, '($1)');
  //   } else if (newVal.length <= 6) {
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
  //   } else if (newVal.length <= 10) {
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
  //   } else { 
  //     newVal = newVal.substring(0, 10);
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
  //   }
  //   this.ngControl.valueAccessor.writeValue(newVal);
  // }

  // ngOnDestroy() {

  // }


  @Input('phoneMask') params: any;
  @Input('phoneControl') params1: AbstractControl;
  constructor(public ngControl: NgControl, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.onInputChange();
  }



  onInputChange() {
    this.ngControl.valueChanges.subscribe(data => {
      if (this.params1 !== undefined && this.params !== undefined) {
         let preInputValue:string = this.params;
      var lastChar:string = preInputValue.substr(preInputValue.length - 1);
      var newVal = data.replace(/\D/g, '');

      let start = this.renderer.selectRootElement('#tel').selectionStart;
      let end = this.renderer.selectRootElement('#tel').selectionEnd;
 
     
      if (data.length < preInputValue.length) {
  
      if(preInputValue.length < start){
        if(lastChar == ')'){
          newVal = newVal.substr(0,newVal.length-1); 
        }
      }
      if (newVal.length == 0) {
        newVal = '';
      } 
      else if (newVal.length <= 3) {
       
        newVal = newVal.replace(/^(\d{0,3})/, '($1');
      } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
      } else {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
      }
     
      this.params1.setValue(newVal,{emitEvent: false});
      this.renderer.selectRootElement('#tel').setSelectionRange(start,end);
    } else{
      var removedD = data.charAt(start);
    if (newVal.length == 0) {
      newVal = '';
    } 
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
    }
    
    if(preInputValue.length >= start){
    
      if(removedD == '('){
        start = start +1;
        end = end +1;
      }
      if(removedD == ')'){
        start = start +2;
        end = end +2;
      }
      if(removedD == '-'){
        start = start +1;
        end = end +1;
      }
      if(removedD == " "){
          start = start +1;
          end = end +1;
        }
      this.params1.setValue(newVal,{emitEvent: false});
      this.renderer.selectRootElement('#tel').setSelectionRange(start,end);
    } else{
        this.params1.setValue(newVal,{emitEvent: false});
        this.renderer.selectRootElement('#tel').setSelectionRange(start+2,end+2); // +2 because of wanting standard typing
    }
  }
      }



    });

  }

  ngOnDestroy() {

  }

  // <input id="tel" class="form-control" [phoneMask]="userform.value.number" [(ngModel)]="test" name="number"  maxlength="14" 
  //   [ngClass]="(userForm.controls['phone'].invalid)? 'errmsg' : 'validmsg'" [phoneControl]="userform.controls['number']">		





}