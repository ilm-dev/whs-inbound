import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ApiRuta } from 'src/app/Datos/Conexion';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';

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

    DocName:String='';
    Vendor:String='';
    purchasingOrder:String=''
    PalletNo:String='';
    PCN_EXTERNAL:String='';
    PCN_INTERNAL:String='';
    Quantity:String='';
    PrinterName:String='';
  
    vendorControl = new FormControl('');
    docNameControl = new FormControl('');
    poControl = new FormControl('');
    palletControl  = new FormControl('');
    pcnExtControl = new FormControl('');
    pcnIntControl = new FormControl('');
    qtyControl = new FormControl('');
    printerControl = new FormControl('');
  
    constructor(public apiruta: ApiRuta) {
        
      }
  ngOnInit(): void {
    //document.getElementById("Vendor").focus();
  }
  
  sendToPrint()
  {
    var msj = 'ERROR';
    var ico = 'error';

    if(this.qtyControl.value == '10')
     {
       msj = 'transaccion exitosa';
     ico = 'success';
     console.log('-------------CONDICION = Y');
    }
else
{
  console.log('-------------CONDICION = N');
}
    
    
    
    
    this.messageSuccess(msj,ico);
    //document.getElementById("PCN_EXTERNAL").focus();
  }
  
  messageSuccess(msj:string,ico:any) {
    Swal.fire({
      position: 'center',
      icon: ico,
      title: msj,
      showConfirmButton: false,
      timer: 1500
    })
  }
  }