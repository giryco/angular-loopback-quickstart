import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { } from '@types/googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input() params: any;
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  latitude: number;
  longitude: number;
  constructor() { }

  ngOnInit() {
    this.ignition();
  }

  ignition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        if (this.latitude) {
          this.initMap();
        } else {
          console.log(32);
          setTimeout(() => {
            this.ignition();
          }, 500);
        }
      }, function() {
        this.latitude = 123;
        this.longitude = 123;
        this.initMap();
      });
    } else {
      // Browser doesn't support Geolocation
      this.latitude = 123;
      this.longitude = 123;

      this.initMap();
    }
  }

  initMap = () => {
    const mapProp = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
