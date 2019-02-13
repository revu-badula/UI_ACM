import { Component, OnInit, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PhonePipe } from '../locality-component/phone-pipe';
import { ApiserviceService } from '../apiservice.service';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers: [PhonePipe, ApiserviceService]
})
export class FormsComponent implements OnInit {

  public loading: boolean = false;
  @ViewChild('content') content: TemplateRef<any>;
  @Output() submitClick = new EventEmitter<object>();
  public editVendorForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    private modalService: NgbModal, private phone: PhonePipe, private _apiservice: ApiserviceService) { }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.createForm();
  }

  createVendor(value) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    value['createdBy'] = Cookie.get('userName');
    this._apiservice.postVendorData(value)
      .subscribe((data: any) => {
        this.loading = false;
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }
  cancelButton(event) {
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }

  open(content) {
    this.modalService.open(content);

  }
  redirect() {
    this.router.navigate(['/vendorsView']);
  }


  getNumber(value) {
    if (value.length === 10) {
      let data = value.slice(0, 3);
      let pn = data + '-';
      let d2 = value.slice(3, 6);
      let pn2 = d2 + '-';
      let d3 = value.slice(6, 10);
      let phm = pn + pn2 + d3;
      this.editVendorForm.patchValue({
        vendorContact: {
          phoneNumber: phm
        }
      });

    }
    else {
      this.editVendorForm.patchValue({
        vendorContact: {
          phoneNumber: value
        }
      });
    }

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



  getPhoneNumber(e:any, value:any) {
    let num = e.target.value.match(/^[0-9-]*$/);
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

    return (key == 8 || key == 9 || key == 189 ||  key == 16 || key == 37 || key == 39 || key == 35 || key == 17 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }





  createForm() {
    this.editVendorForm = this.fb.group({
      name: ['', Validators.required],
      vendorAddress: this.fb.group({
        streetName: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required]
          

      }),
      vendorContact: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailId: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      }),
    });
  }
}
