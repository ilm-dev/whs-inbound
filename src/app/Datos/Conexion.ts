import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class ApiRuta{
  constructor(private http:HttpClient){}

    serverUrl="http://10.35.64.27:9080/";

    //serverUrl="https://localhost:44352/";
    //serverUrl="http://localhost:8080/";

    headers= new HttpHeaders()
    .set('Access-Control-Allow-Credentials' , 'true')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS')
    .set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');


    api(){
        return this.serverUrl;
    }

    messaggeError(data: any) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'DATABASE ERROR',
          text: JSON.stringify(data),
          footer: '<a href="https://apps.hunterdouglas.com/SupportRequest/request" target="_blank">Report To IT Developers</a>'
        })
      }
  }
  