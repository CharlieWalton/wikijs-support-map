import { Component, OnInit, ViewChild } from '@angular/core';
import L, { Map, latLng, tileLayer, Icon } from 'leaflet'
import { PageService } from './page.service';
import { Page } from './page';
import { NgElement, WithProperties } from '@angular/elements';
import { PageDescriptionComponent } from './page-description/page-description.component';
import { IconMap } from './icon.map';
import { findDeprecatedUsages } from 'graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild('description')
  title = 'support-map';
  data: any[];
  loading = true;
  error: any;

  options = {
    layers: [
      tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(52.628591010807305, 1.2963359850047036)
  };
  map: Map;
  page?: Page;

  constructor(private pageService: PageService) {
    this.data = [];
    
  }

  ngOnInit() {
    this.pageService.getPages().subscribe(result => {

      this.data = result.pages.list;
      this.loading = false
      this.addMarkers(this.data);
    });
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  addMarkers(data: Page[]) {
    data.forEach((value: Page) => {
      if (value.lat == null || value.lon == null) { return; }
      let icon = L.divIcon({
        html: `
          <div class="map-pin-container">
            <div class="map-pin"></div>
            <i class="material-icons">` + IconMap.get(value.path.replaceAll("-", " ").split("/")[0]) + `</i>
          </div>`,
        className: "",
        iconSize: [30, 40],
        iconAnchor: [15, 42],
      });
      let selectedIcon = L.divIcon({
        html: `
          <div class="map-pin-container">
            <div class="map-pin"></div>
            <i class="material-icons">` + IconMap.get(value.path.replaceAll("-", " ").split("/")[0]) + `</i>
          </div>`,
        className: "selected",
        iconSize: [30, 40],
        iconAnchor: [15, 42],
      });
      const marker = L.marker([value.lat, value.lon], { icon: icon}).addTo(this.map);
      marker.bindPopup( fn => {
        const popupEl: NgElement & WithProperties<PageDescriptionComponent> = document.createElement('popup-element') as any;
        popupEl.page = value;
        this.page = value;
        // Add to the DOM
        document.body.appendChild(popupEl);
        return popupEl;
      }, {
        maxWidth : 560,
        minWidth: 400
      });
      marker.on('popupopen', function(evt) {
        marker.setIcon(selectedIcon);
      });
      marker.on('popupclose', function(evt) {
        var marker = evt.target;
        marker.setIcon(icon);
      });
      marker.getPopup()!.on('remove', fn => {
        this.page = undefined;
      });
    });
  }
}
