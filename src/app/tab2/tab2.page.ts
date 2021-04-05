import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EmployedI } from '../models/employed.interface';
import { EmployedService } from '../services/employed.service';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  employed: EmployedI[];
  usuario: any;
  password: any;
  usuarioExiste: boolean;

  bluetoothList: any = [];
  selectedPrinter: any;

  constructor(private router: Router,
    private _employedService: EmployedService,
    public alertController: AlertController,
    private print: PrintService) { }

  ngOnInit() {
    this.loadEmployeds();
    this.listPrinter();
    this.password = '';
    this.usuario = '';
  }

  //This will list all of your bluetooth devices
  listPrinter() {
    this.print.searchBluetoothPrinter()
      .then(resp => {

        //List of bluetooth device list
        this.bluetoothList = resp;
      });
  }

  //This will store selected bluetooth device mac address
  async selectPrinter(macAddress) {
    //Selected printer macAddress stored here
    this.selectedPrinter = macAddress;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Impresora conectada',
      message: 'La impresora se a conectado correctamente',
      buttons: ['OK']
    });
    await alert.present();

  }

  printStuff() {
    //The text that you want to print
    var myText = "                   PREFACTURA             \n\n\n ============================================== \n\nNombre del cliente: Juan Jimenz\nRUC.CI: 123432343\nDireccion: " 
    + "Av cojimies km 2 y pedernales\nTipo de consumido: Residencial\nLectura pasada: 1234 m3\nLectura actual: 1254 m3\nConsumo actual: 20 m3 \nTotal a pagar: 7.54$ \nClave catastral: 16-001-0140-07950-00-00\n\n " + 
    "==============================================\nUsuario: admin\n" + "Fecha de lectura: " + "\n\n"+"Latitud: "+"\n\n"+"Loguitud: " + "\n\n"+ "Recuerde que este documento no tiene valides tributaria, la factura sera entregada cuando realice el pago en cualquiera de nuestras entidades de recaudacion.\n\n\n\n";
    this.print.sendToBluetoothPrinter(this.selectedPrinter, myText);
  }

  loadEmployeds() {
    this._employedService.getUsers().subscribe(res => {
      this.employed = res;
      console.log(this.employed);
    });
  }

  async login(){
    console.log(this.usuario);
    console.log(this.password);

    if(this.usuario == '' || this.password == '' || this.usuario == null || this.password == null){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Campo Vacío',
        message: 'Por favor ingrese su usario y contraseña para continuar',
        buttons: ['OK']
      });
      await alert.present();
    }else{
      for(let i = 0; i< this.employed.length; i++){
        if(this.employed[i].usuario == this.usuario && this.employed[i].password == this.password){

          break;
              this.usuarioExiste = true;
        }else{
          this.usuarioExiste = false;
        }
      }

      if(this.usuarioExiste == false){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          message: 'Usuario o Contraseña incorrectos',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
    
  }

}
