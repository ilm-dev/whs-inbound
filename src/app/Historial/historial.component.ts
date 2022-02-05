import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ApiRuta } from 'src/app/Datos/Conexion';

@Component({
  selector: 'historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent implements OnInit {
  displayedColumns: string[] = ['IdEntry', 'Entry', 'User', 'Vendor', 'SAP_PO', 'PCN', 'Unit', 'QTY', 'base_UoM', 'base_Qty', 'ACTIONS'];
  public dataSource = new MatTableDataSource();
  public idEntry: String='';



  @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
  constructor(public apiruta:ApiRuta,private http: HttpClient, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.CargarTabla();
    this.dataSource.paginator = this.paginator;
  }

  CargarTabla()
  {

    var url= this.apiruta.serverUrl+'api/Entries';
    this.http.get(url).toPromise().then((data: any) =>{
      if (data.result === 0){
        this.dataSource=data.data;
        }
      },( err : HttpErrorResponse)=>{
        console.log(err.error['msj']+'\nstatus:400');
    });
  }

}
