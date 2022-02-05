import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, switchMap, map, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiRuta } from 'src/app/Datos/Conexion';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'inbound01',
  templateUrl: './entrances-material.component.html',
  styleUrls: ['./entrances-material.component.css']
})

export class EntrancesMaterialComponent {

  isShow = true;
  onChange(ob: MatSlideToggleChange) {
    
    let condition  = ob.checked.toString();
    //console.log(condition);
    localStorage.setItem('condition', condition);

    if (condition=='true'){
      this.QTY="1";
      this.isShow = false;
      this.Pallet = '';
    }else  if(condition=='false'){
      this.QTY='';
      this.isShow = true;
      this.Pallet = '';
    }
  }

  myControl = new FormControl(null, [
    Validators.required
  ]);
  filteredOptions: Observable<any> | undefined;


  myControlPrinters = new FormControl();
  filteredOptionsPrinters: Observable<any> | undefined;

  
 
  sap_poFormControl = new FormControl('', [
    Validators.required
  ]);
  palletFormControl = new FormControl('', [
    Validators.required
  ]);
  pcnFormControl = new FormControl('');
  

  unitFormControl = new FormControl('');
  
  qtyFormControl = new FormControl('');

  BaseUoMFormControl = new FormControl('');

  BaseQTYFormControl = new FormControl('');
  
  printerFormControl = new FormControl('', [
    Validators.required
  ]);
  
  viewBandera(bandera: boolean){
   if (bandera==true){
     this.pcnFormControl.setValidators([Validators.required]);
     this.unitFormControl.setValidators([Validators.required]);
     this.qtyFormControl.setValidators([Validators.required]);
     this.BaseUoMFormControl.setValidators([Validators.required]);
     this.BaseQTYFormControl.setValidators([Validators.required]);
     this.palletFormControl.setValidators([Validators.required]);
   }else if (localStorage.getItem('condition')=='true'){
    this.BaseQTYFormControl.setValidators(null);
    this.pcnFormControl.setValidators(null);
    //document.getElementById('PCN').focus();
   }else{
    this.pcnFormControl.setValidators(null);
    this.unitFormControl.setValidators(null);
    this.qtyFormControl.setValidators(null);
    this.BaseUoMFormControl.setValidators(null);
    this.BaseQTYFormControl.setValidators(null);
    this.palletFormControl.setValidators(null);
    //document.getElementById('PCN').focus();
   }
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     switchMap(value => this._filter(value))
    //   );

    //   this.filteredOptionsPrinters = this.myControlPrinters.valueChanges
    //   .pipe(
    //     startWith(''),
    //     switchMap(value => this._filterPrinters(value))
    //   );
  }

  

//   private _filter(value: string) {
//     const filterValue = value.toLowerCase();
//     const vendor = this.Vendor;
//     return this.vendorservice.getVendorPost().pipe(
//       filter(data => !!data),
//       map((data) => {
//         return data["data"].filter(option => option.vendorName.toLowerCase().includes(filterValue))
//       })
//     )
//   }

//   private _filterPrinters(value: string) {
//     const filterValuePrinters = value.toLowerCase();
//     return this.printerservice.getPrinters().pipe(
//       filter(data => !!data),
//       map((data) => {
//         return data["data"].filter(optionPrinters => optionPrinters.printerName.trim().toLowerCase().includes(value))
//       })
//     )
//   }

  

  Vendor: String='';
  SAP_PO: String='';
  PCN: String='';
  QTY: String='';
  Unit: String='';
  idPrinter: String='';
  BaseUoM: String='';
  BaseQTY: String='';
  Pallet: String='';

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, public apiruta:ApiRuta
    ) {
    localStorage.setItem('condition', 'false');
    console.log(localStorage.getItem('condition'));
    this.isShow = true;
  }

//   viewValidator(event){
//     if (event.which==13) {
//     this.viewBandera(true);
//     }
//   }

//   viewValidatorPCN(event){
//     if (event.which==13 && this.PCN!=undefined) {
//       this.viewPCNS(event);
//     }
//   }
//   viewValidatorQTY(event){
//     if (event.which==13 && this.PCN!=undefined) {
//       //document.getElementById('BaseQTY').click();
//     }
//   }
//   viewValidatorPallet(event){
//     if (event.which==13) {
//       if (this.isShow == true){
//         //document.getElementById('SAP_PO').click();
//       }else if (this.isShow == false){
//         //document.getElementById('Pallet').click();
//       }
//     }
//   }
//   viewValidatorStatus(event){
//     if (event.which==13) {
//       if (this.idPrinter==undefined && this.BaseQTY!=undefined){
//         //document.getElementById('Printer').click();
//         console.log(this.BaseQTY);
//       }else if (this.BaseQTY==undefined){
//         //document.getElementById('BaseQTY').click();
//       }else{
//         //document.getElementById('btnEntrance').click();
//       }
//     }
//   }

//   viewValidatorPrinter(event){
//     if (event.which==13) {
//       if (this.idPrinter!=undefined){
//         //document.getElementById('btnEntrance').click();
//       }
//     }
//   }

//   viewPCNS(){
//     const id = event.target.value;
//        this.pcnsservice.getPcnsPost(id).subscribe( pcns => {
//       //  this.dataSource.data  = respose.data;
//       if (pcns.data=='NA' || pcns.data===null){
//         this.PCN = '';
//         const pcn = document.getElementById("PCN");
//         this.viewValidator(event);
//       }else if((localStorage.getItem('condition')=='true')){
//         this.Unit = pcns.data[0].order_UoM;
//         this.BaseUoM = pcns.data[0].base_UoM;
//         console.log(pcns.data[0].order_UoM);
//         //document.getElementById('BaseQTY').click();
//       }else{
//         this.Unit = pcns.data[0].order_UoM;
//         this.BaseUoM = pcns.data[0].base_UoM;
//         console.log(pcns.data[0].order_UoM);
//         //document.getElementById('QTY').click();
//       }
//      });
//     }

  verify(){
    if(this.Vendor==undefined || this.Vendor==''){
      this.Vendor= '';
      //document.getElementById('Vendor').click();
      this.viewBandera(true);
    }else if (this.isShow == false && this.Pallet==undefined || this.Pallet==''){
      //document.getElementById('Pallet').click();
        this.viewBandera(true);
    }else if(this.SAP_PO==undefined || this.SAP_PO==''){
      this.SAP_PO= '';
      //document.getElementById('SAP_PO').click();
      this.viewBandera(true);
    }else if(this.PCN==undefined || this.PCN==''){
      this.PCN= '';
      //document.getElementById('PCN').click();
      this.viewBandera(true);
    }else if(this.Unit==undefined || this.Unit==''){
      this.Unit= '';
      //document.getElementById('Unit').click();
      this.viewBandera(true);
    }else if(this.QTY==undefined || this.QTY==null){
      this.QTY= '';
      //document.getElementById('QTY').click();
      this.viewBandera(true);
    }else if(this.BaseUoM==undefined || this.BaseUoM==null){
      this.BaseUoM= '';
      //document.getElementById('BaseUoM').focus();
      this.viewBandera(true);
    }else if(this.BaseQTY==undefined || this.BaseQTY==null){
      this.BaseQTY= '';
      //document.getElementById('BaseQTY').click();
      this.viewBandera(true);
    }else if(this.idPrinter==undefined || this.idPrinter==''){
      this.idPrinter= '';
      //document.getElementById('Printer').click();
      this.viewBandera(true);
    }
       
    
  }
  postData() {
    //var audioElement = new Audio('car_horn.wav');

    //  var token = localStorage.getItem('userToken').replace(/['"]+/g, '');
    // // var WorkStationLocal = localStorage.getItem('workstation').replace(/['"]+/g, '');
    // // var BadgeLocal = localStorage.getItem('userBadge').replace(/['"]+/g, '');
    // let url = this.apiruta.serverUrl+"api/Entries";
    // if (this.Pallet==undefined || this.Pallet==''){
    //   this.Pallet='1';
    // }
    // this.http.post(url, {
    //   Vendor: this.Vendor,
    //   Pallet: this.Pallet.toString(),
    //   SAP_PO: this.SAP_PO,
    //   PCN: this.PCN.trim(),
    //   Order_Qty: this.QTY,
    //   Order_UoM: this.Unit,
    //   Base_UoM: this.BaseUoM,
    //   Base_Qty: this.BaseQTY,
    // //   Workstation: WorkStationLocal,
    // //   Badge: BadgeLocal,
    //   Printer: this.idPrinter
    // }, { headers: { 'Authorization': 'Bearer  ' + token + '', 'My-Custom-Header': 'foobar' } }).toPromise().then((data: any) => {
    //   if(data.result===0){
    //     if (localStorage.getItem('condition')=='true'){
    //       this.BaseQTY = '';
    //       this.PCN='';
    //       //audioElement.play();
    //       //console.log('--------- NO SE ESCUCHA ---------');
    //       //AQUI
    //     }else if (localStorage.getItem('condition')=='false'){
    //       this.PCN= '';
    //       this.Unit = '';
    //       this.QTY = '';
    //       this.BaseUoM = '';
    //       this.BaseQTY = '';
    //     }
    //     this.qtyFormControl.setErrors(null);
    //     this.openSnackBar('Entry Done', 'Ok');
    //     console.log('Entrada Realizada');
    //     console.log(data.result);
    //     this.viewBandera(false);
    //   }else{
    //     console.log(data.result);
    //     console.log(data.msj);
    //     this.openSnackBar('Not registered', 'Error');
    //   }
      
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log('Error, No registrado ' +JSON.stringify(err));
    //     this.openSnackBar('Not registered', JSON.stringify(err));
    //   } );
  }

  messaggeError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: 'Registering Entry Failed.',
      footer: '<a href="https://apps.hunterdouglas.com/SupportRequest/request" target="_blank">Report To IT Developers</a>'
    })
  }

  messageSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Entry successfully registered.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


