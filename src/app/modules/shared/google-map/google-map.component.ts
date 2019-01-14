/**
 * IMPORTANT!
 * On /node_modules/@types/googlemaps/index.d.ts, add: declare module 'googlemaps';
 * Call Googlemaps api in index.html
 */

/**
 * @param params.marker.currentLocation: boolean
 * @param params.
*/

import { Component, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { } from 'googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnChanges {
  @Input() params: any;
  @Output() googleMapDataOutput = new EventEmitter();
  @ViewChild('gmap') gmapElement: any;

  isLoading: boolean;
  map: google.maps.Map;
  markers = [];
  labelIndex = 0;
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  latitude: number;
  longitude: number;

  constructor() { }

  ngOnChanges() {
    this.isLoading = true;
    this.params ? this.ignition() : this.setErrors('params is required');
  }

  ignition = () => {
    this.isLoading = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        if (this.latitude) {
          this.initMap();

          google.maps.event.addDomListener(window, 'load', this.initMap);
        } else {
          setTimeout(() => {
            this.ignition();
          }, 500);
        }
      }, function () {
        this.latitude = -9.671327;
        this.longitude = -35.7574459;
        this.initMap();

        google.maps.event.addDomListener(window, 'load', this.initMap);
      });
    } else {
      // Browser doesn't support Geolocation
      this.latitude = -9.671327;
      this.longitude = -35.7574459;
      this.initMap();

      google.maps.event.addDomListener(window, 'load', this.initMap);
    }
  }

  initMap = () => {
    const firstLocation = { lat: this.latitude, lng: this.longitude };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 15,
      center: firstLocation
    });

    // Add marker on click event over map without marker
    google.maps.event.addListener(this.map, 'click', event => {
      if ((this.params && this.params.marker && this.params.marker.multiple) || (this.markers.length < 1)) {
        this.addMarker(event.latLng, this.map);
      }
    });

    // Remover marker on click event over existing marker
    // this.marker.addListener('click', event => {
    //   console.log(event);
    // });

    // Add a marker at the center of the map.
    if (this.params) {
      if (this.params.marker) {
        if (this.params.marker.currentLocation) {
          this.addMarker(firstLocation, this.map);
        }
      }
    }
  }

  // Adds a marker to the map.
  addMarker = (location, map) => {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: this.labels[this.labelIndex++ % this.labels.length],
      map: map,
      draggable: true,
      title: Date.now().toString()
    });

    this.markers.push(marker);

    google.maps.event.addListener(marker, 'click', () => {
      this.markerSettings(marker);
    });

    google.maps.event.addListener(marker, 'dragend', () => {
      this.markerSettings(marker);
    });

    this.googleMapDataOutput.emit({
      trigger: 'addedMarker',
      response: marker
    });
  }

  markerSettings = (marker) => {
    this.googleMapDataOutput.emit({
      trigger: 'clickedMarker',
      response: marker
    });
  }

  setErrors = (msg) => {
    console.log(msg);
  }
}
