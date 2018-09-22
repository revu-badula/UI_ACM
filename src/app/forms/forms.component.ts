import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  
  @Output() submitClick = new EventEmitter<object>();
   public editVendorForm: FormGroup;
  constructor( private fb: FormBuilder, private router: Router,private modalService: NgbModal) { }

  ngOnInit() {
   this.createForm();
  }
  
   createVendor(value){
   console.log(this.editVendorForm.value);
    this.submitClick.emit(value);
    console.log(value);
  }
  cancelButton(){
  this.router.navigate(['/dashboard']);
  }
  
  open(content) {
   this.modalService.open(content);

  }
d(){
this.router.navigate(['/vendorsView']);
}


 createForm() {
    this.editVendorForm = this.fb.group({
      name: ['', Validators.required],
      vendorAddress: this.fb.group({
        streetName: '',
        city: '',
        state: '',
        zipcode: ['', Validators.required]
      }),
      vendorContact: this.fb.group({
        firstName: '',
        lastName: '',
        emailId: ['', Validators.email],
        phoneNumber: ['', Validators.required]
      }),
    });
  }
}
