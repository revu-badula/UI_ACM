import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PhonePipe } from '../locality-component/phone-pipe';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css'],
  providers: [ApiserviceService, PhonePipe]
})


export class EditVendorComponent implements OnInit {
  activatedRoute: any;
  color: String;
  public userId: number;
  public name: string;
  public firstName: string;
  public lastName: string;
  public emailId: string;
  public phoneNumber: string;
  public address: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public loading: boolean = false;
  public showEdi: boolean = true;
  public updatedBy: any;
  public updatedTs: any;
  //public vendorDetails: VendorDetails;


  public editVendorForm: FormGroup;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private router: Router, private route: ActivatedRoute,
    private _apiservice: ApiserviceService, private fb: FormBuilder,
    private modalService: NgbModal, private phone: PhonePipe) {
  }


  editClicked(event): void {

    if (this.editVendorForm.disabled) {
      this.editVendorForm.enable();
    }
    else {
      this.editVendorForm.disable();
    }
  }


  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.createForm();

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.editVendorForm.disable();
    });
    this.onDisplayVendors();

  }

  open(content) {
    this.modalService.open(content);

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
        emailId: ['', Validators.email],
        phoneNumber: ['', Validators.required]
      }),
    });
  }

  /*getPhoneNumber(value)
  {
  
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

    return (key == 8 || key == 9 || key == 17 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }


  getNumber(value) {
    if (value.length === 12) {
      this.editVendorForm.patchValue({
        vendorContact: {
          phoneNumber: value
        }
      });
    }
    else {
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

  }





  createVendor(value): void {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    value['vendorId'] = this.userId;
    value['updatedBy'] = Cookie.get('userName');
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
    //this.editVendorForm.disable();
    event.preventDefault();
    this.router.navigate(['/vendorsView']);


  }





  onDisplayVendors() {
    this.loading = true;
    this._apiservice.getVendorExtra(this.userId)
      .subscribe((data: any) => {
        this.loading = false;
        this.updatedBy = data.updatedBy;
        this.updatedTs = data.updatedTs;
        (<FormGroup>this.editVendorForm)
          .patchValue(data, { onlySelf: true });
      }, error => {
        this.loading = false;
        console.log(error);
      });


  }


  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
      this.color = 'offline';
    }

  }
  x
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

}


