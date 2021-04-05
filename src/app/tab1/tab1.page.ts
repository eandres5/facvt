import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  constructor(
    private router: Router,
    private geolocation: Geolocation) { }

  ngOnInit() {


  }
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  getCurrentCoordinates() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.longitude);
      console.log(this.latitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
