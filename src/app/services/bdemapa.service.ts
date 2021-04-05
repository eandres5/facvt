import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BdemapaService {

  baseUrl = environment.baseUrl;
  res: any;

  constructor(private http: HttpClient) { }

  getMedidores(){
    this.res = this.http.get(`${this.baseUrl}/table2.php`);
    return this.res;
  }

  getCampos(){
    this.res = this.http.get(`${this.baseUrl}/getcampo.php`);
    return this.res;
  }
}
