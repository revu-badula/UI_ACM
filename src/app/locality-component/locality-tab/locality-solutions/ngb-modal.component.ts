import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
//import { AlertService } from '../alert.service';
import { APP_CONFIG } from '../../../app.config';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, PatternValidator } from '@angular/forms';
//import { FileValidator } from '../file-input.validator';
import { ApiserviceService } from '../../../apiservice.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationSolution, Solutions, Vendor, Device, DeviceDocDTO } from '../../../data_model_lsolutions';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { UtilService } from '../../../util.service';
declare var swal: any; ''
@Component({
    selector: 'ngbd-modal-content',
    template: `
    <div class="modal-header">
	<h4 class="modal-title">Enter Device Information</h4>
	<button type="button" class="close" aria-label="Close" (click)="activeModal.close()">
		<span aria-hidden="true" style="color: white">&times;</span>
	</button>
</div>
<div class="modal-body">
	
	<form class=form [formGroup]="modalForm"
		(ngSubmit)="addDevice(modalForm.value)">
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="model">Model Number</label>

				<div class="asterisk">*</div>
				<input type="email" class="form-control" id="modelNumber"
					placeholder="Equipment Model Number" formControlName="modelNumber">

			</div>
			<div class="form-group col-md-6">
				<label for="serial">Serial Number</label>
				<div class="asterisk">*</div>
				<input type="text" class="form-control" id="serialNumber"
					placeholder="Equipment Serial Number"
					formControlName="serialNumber">
			</div>
		</div>
		<p>
			<b>Physical Address</b>
		</p>
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="street">Street 1</label>
				<div class="asterisk">*</div>
				<input type="text" class="form-control" id="street1"
					placeholder="enter here" formControlName="street1">
			</div>
			<div class="form-group col-md-6">
				<label for="street">Street 2</label>
				<div class="asterisk">*</div>
				<input type="text" class="form-control" id="street2"
					placeholder="enter here" formControlName="street2">
			</div>



		</div>
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="state">State</label>
				<div class="asterisk">*</div>
				<select id="inputState" class="form-control" id="state"
					formControlName=state>
					<option selected>Choose...</option>
					<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>

					<option>...</option>
				</select>
			</div>
			<div class="form-group col-md-6">
				<label for="city">City</label>
				<div class="asterisk">*</div>
				<input type="text" class="form-control" id="city"
					placeholder="enter here" formControlName="city">
			</div>


		</div>
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="inputZip">Zip Code</label>
				<div class="asterisk">*</div>
				<input type="text" class="form-control" pattern="[0-9]{5}"
					title='Zip Code (Format: 00000)' id="zipCode"
					formControlName=zipCode>
			</div>
		</div>
		<hr />
		
			<label>Overall Scanning Status</label>
			<div class="asterisk">*</div>
		
		<div>
			<select id="inputState" class="form-control"
				formControlName=overallStatus>
				<option selected>Choose...</option>
				<option value="Passed">Passed</option>
				<option value="Failed">Failed</option>
				<option value="Pending">Pending</option>

			</select>
		</div>
		<hr />
		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="dueDate">Next Scanning Date</label>
				<div class="asterisk">*</div>
						 
				<my-date-picker name="myname" [selDate]="selectDate"
					formControlName=nextScanningDt ></my-date-picker>
					<p style ="color:red;font-weight:bold;">{{err}}</p>
			</div>
		</div>
		<hr />
		<p>
			<b>Notes</b>
			
		</p>
		<div>
			<textarea name="" id="" rows="5" class="form-control"
				formControlName=notes></textarea>
		</div>
		<hr />
		<p>
			<b>Attachments</b>
		</p>
		<div>
			<div class="col-sm-5 col-md-5 col-lg-5">
		<input type="file" #fileInput (change)="createMOUDTO($event)" accept=".pdf,.doc,.docx">

			
			</div>

		</div>
		
        <div class="display-file">
						<table border="1">
							<tr>
								<th>FileName</th>
								<th>Action</th>
							</tr>
							<tr *ngFor="let file of device.deviceDocDTO let i=index">
								<td *ngIf="file.status"
									(click)="getFile(file.deviceDocId)"
									style="cursor: pointer; color: blue;">{{file.fileName}}</td>
								<td *ngIf="file.status"
									(click)="deleteFile(file.deviceDocId,i)"
									style="cursor: pointer;"><i class=" fa fa-trash" aria-hidden="true" style="font-size: 24px;color: #3A539B;"></i></td>

							
							</tr>
						</table>


                </div>
                <div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close()">Close</button>
			<button *ngIf="!showButton"  type="submit" class="submit btn btn-primary"
                [disabled]="modalForm.invalid">Save</button>
                <button *ngIf="showButton" type="submit" class="submit btn btn-primary"
				[disabled]="modalForm.invalid">Update</button>
					


        </div>
   
	</form>

</div>

   `,
   styleUrls: ['./locality-solutions.component.css'],
    providers: [ApiserviceService]
})

export class NgbdModalContent implements OnInit {

    public links: any;
    public error: any;
    public modalForm: FormGroup;
    fileToUpload: File = null;
    deviceDocDTO: DeviceDocDTO;
    public selectDate: any;
    public myFiles: any;
    public files = [] as File[];
    @ViewChild("fileInput") inputEl: ElementRef;
    @Input() appSolutionId;
    @Input() deviceData;
    @Input() isEdit;
    // @Input() screenID;

    public isRequired: boolean = true;
    public showButton: boolean = false;
    device: Device;
    public err:any;

    constructor(public activeModal: NgbActiveModal,
        private _fb: FormBuilder, private _apiservice: ApiserviceService,
        private http: Http, private datepipe: DatePipe, private utilService: UtilService) {
        this.device = new Device();

        //this.createForm();
    }

    ngOnInit() {
        if (this.isEdit) {
            this.createForm();
            this.showButton = true;
            this.modalForm.controls['modelNumber'].setValue(this.deviceData.modelNumber);
            this.modalForm.controls['serialNumber'].setValue(this.deviceData.serialNumber);
            this.modalForm.controls['street1'].setValue(this.deviceData.street1);
            this.modalForm.controls['street2'].setValue(this.deviceData.street2);
            this.modalForm.controls['city'].setValue(this.deviceData.city);
            this.modalForm.controls['state'].setValue(this.deviceData.state);
            this.modalForm.controls['zipCode'].setValue(this.deviceData.zipCode);
            this.modalForm.controls['overallStatus'].setValue(this.deviceData.overallStatus);
            let d = new Date(this.deviceData.nextScanningDt);
            this.selectDate = {
                date: {
                    year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()
                }
            }
            this.device.deviceDocDTO = this.deviceData.deviceDocDTO;
            this.modalForm.controls['nextScanningDt'].setValue(this.selectDate);
            this.modalForm.controls['notes'].setValue(this.deviceData.notes);
        }
        else {
            this.createForm();
        }
    }



    public createForm() {

        this.modalForm = this._fb.group({
            modelNumber: ['', Validators.required],
            serialNumber: ['', Validators.required],
            street1: ['', Validators.required],
            street2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            overallStatus: ['', Validators.required],
            nextScanningDt: ['', Validators.required],
            notes: ['']

        });

    }
    addDevice(value) {

        this.device.modelNumber = value.modelNumber;
        this.device.serialNumber = value.serialNumber;
        this.device.street1 = value.street1;
        this.device.street2 = value.street2;
        this.device.city = value.city;
        this.device.state = value.state;
        this.device.zipCode = value.zipCode;
        let latest_date = this.datepipe.transform(value.nextScanningDt.formatted, 'yyyy-MM-dd');
        this.device.nextScanningDt = moment(latest_date).format();;
        this.device.overallStatus = value.overallStatus;
        this.device.notes = value.notes;
        this.device.appSolutionId = this.appSolutionId;
        var formData = new FormData();
        if (this.isEdit) {
            this.device.appSolutionDevice = this.deviceData.appSolutionDevice;
            let url_update = APP_CONFIG.updateAppSolutionDevice;
            for (let i = 0; i < this.files.length; i++) {
                formData.append('appSolutionDeviceDocs', this.files[i]);

            }
            formData.append('appSolutionDeviceString', JSON.stringify(this.device));
            this.http.post(url_update, formData).subscribe((data: any) => {
                UtilService.popModal = true;
                this.alert('Success', 'Device has been updated.').then(success => {
                    this.activeModal.close();
                  });

            }, error => {

                console.log(error);
            });
        }
        else {
            let url_update = APP_CONFIG.saveAppSolutionDevices;
            for (let i = 0; i < this.files.length; i++) {
                formData.append('appSolutionDocs', this.files[i]);

            }
            formData.append('appSolutionDeviceString', JSON.stringify(this.device));
            this.http.post(url_update, formData).subscribe((data: any) => {
                UtilService.popModal = true;
                this.alert('Success', 'Device has been created.').then(success => {
                    this.activeModal.close();
                  });

            }, error => {

                console.log(error);
            });
        }


    }

    createMOUDTO(fileInput: any) {
        let files = fileInput.target.files;
        if (files === undefined) { }
        else {
            if (this.device.deviceDocDTO === null) {
                this.device.deviceDocDTO = [];
                this.deviceDocDTO = new DeviceDocDTO();
                this.deviceDocDTO.fileName = fileInput.target.files[0].name;
                this.deviceDocDTO.status = true;
                this.files.push(fileInput.target.files[0]);
                this.deviceDocDTO.newFile = true;
                this.device.deviceDocDTO.push(this.deviceDocDTO);
            }
            else {
                this.deviceDocDTO = new DeviceDocDTO();
                this.deviceDocDTO.fileName = fileInput.target.files[0].name;
                this.deviceDocDTO.status = true;
                this.deviceDocDTO.newFile = true;
                this.files.push(fileInput.target.files[0]);
                this.device.deviceDocDTO.push(this.deviceDocDTO);


            }
        }

    }

    getFile(id) {
        window.open(APP_CONFIG.getDeviceFile + '?' + 'deviceId' + '=' + id)

    }

    deleteFile(id, index) {
        this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
            .then((result: any) => {
                if (result.value !== undefined && result.value) {
                    if (id === undefined) {
                        let length = this.device.deviceDocDTO.length;
                        if (length === 1) {
                            this.device.deviceDocDTO = []; //a,b,c,d,f = [2] =[3]
                        }
                        else {
                            for (let i = index; i < length; i++) {
                                this.device.deviceDocDTO[i] = this.device.deviceDocDTO[i + 1];
                            }
                            this.device.deviceDocDTO.splice(length - 1, 1);
                        }

                    }
                    else {
                        for (let i = 0; i < this.device.deviceDocDTO.length; i++) {
                            if (this.device.deviceDocDTO[i].deviceDocId === id) {
                                this.device.deviceDocDTO[i].status = false;
                            }
                        }
                    }

                }
            }, error => {
                console.log(error);
            });
    }

    confirm(title = 'Are you sure?', text, confirmButtonText, cancelButtonText, showCancelButton = true) {
        return new Promise((resolve, reject) => {
            swal({
                title: title,
                text: text,
                type: 'warning',
                showCancelButton: showCancelButton,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                resolve(result);
            }, error => reject(error));
        });



    }

    
alert(title = 'Oops...', text = 'Something went wrong') {
    return new Promise((resolve, reject) => {
        swal({
            title: title,
            text: text,
            type: 'info',
            allowOutsideClick: false
        }).then((result) => {
    
            resolve(result);
        },error => reject(error));
    });
}
}