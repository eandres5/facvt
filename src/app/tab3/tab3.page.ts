import { Component, OnInit } from '@angular/core';
import { EmployedI } from '../models/employed.interface';
import { BdemapaService } from '../services/bdemapa.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  fechaAr: any;
  employed: EmployedI;
  textoBuscar: String = '';
  lecturas: any = [];
  campos: any = [];

  constructor(private _medidorService: BdemapaService,
  ) {}

  ngOnInit() {
    this.loadMedidor();
  }

  loadMedidor(){
    this._medidorService.getMedidores().subscribe(res=>{
      this.lecturas = res;
      console.log(this.lecturas);
      
    });
  }

}
