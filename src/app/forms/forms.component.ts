import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PhonePipe } from '../locality-component/phone-pipe';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers: [PhonePipe]
})
export class FormsComponent implements OnInit {

  @Output() submitClick = new EventEmitter<object>();
  public editVendorForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    private modalService: NgbModal, private phone: PhonePipe) { }

  ngOnInit() {
    this.createForm();
  }

  createVendor(value) {
    this.submitClick.emit(value);
  }
  cancelButton() {
    this.router.navigate(['/dashboard']);
  }

  open(content) {
    this.modalService.open(content);

  }
  f() {
    this.router.navigate(['/vendorsView']);
  }

  /*getPhoneNumber(value)
  {
    // console.log(this.phone.transform(value));
    // this.editVendorForm.controls['phoneNumber'].setValue(this.phone.transform(value));
    this.editVendorForm.patchValue({
      vendorContact:{
        phoneNumber:this.phone.transform(value)
      }
    });
  }*/



  getPhoneNumber(e, value) {
    let key = e.charCode || e.keyCode || 0;
    if (key !== 8 && key !== 9) {
      if (value.length === 3) {
        this.editVendorForm.patchValue({
          vendorContact: {
            phoneNumber: value + '-'
          }
        });
      }
      if (value.length === 7) {
        this.editVendorForm.patchValue({
          vendorContact: {
            phoneNumber: value + '-'
          }
        });
      }

    }

    return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

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
