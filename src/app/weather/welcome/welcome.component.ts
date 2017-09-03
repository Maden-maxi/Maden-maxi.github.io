import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SEARCH_PARAMS, WeatherParams, WeatherService} from '../weather.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {AlertSnackBarComponent} from '../alert-snackbar/alert-snackbar.component';

interface SearchFormParams {
  city_name: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  searchByParams = SEARCH_PARAMS;
  selectedParam = this.searchByParams[0].param;
  selectedValues = {};
  loading = false;
  navLinks = [
    {route: './', label: 'CURRENT WEATHER', options: {exact: true}},
    {route: 'forecast', label: 'FORECAST ON WEEK', options: {}}
  ];
  constructor(
    public weatherService: WeatherService,
    private snackBar: MdSnackBar
  ) { }
  ngOnInit() {
  }
  search(f: NgForm) {
    this.loading = true;
    let queryParams;
    switch (this.selectedParam) {
      case this.searchByParams[1].param:
        queryParams = {id: f.value.city_id};
        break;
      case this.searchByParams[2].param:
        queryParams = {lat: f.value.city_lat, lon: f.value.city_lon};
        break;
      case this.searchByParams[3].param:
        queryParams = {zip: this.checkSecondParam(f.value.zip_code, f.value.country_code)};
        break;
      default:
        queryParams = {q: this.checkSecondParam(f.value.city_name, f.value.city_code)};
    }
    this.weatherService.weather(queryParams, 'weather').subscribe(res => {
      this.weatherService.weatherData = res;
    }, error => {
      console.log(error);
    });

    this.weatherService.weather(queryParams, 'forecast').subscribe(res => {
      this.weatherService.forecastData = res;
      setTimeout(() => this.loading = false, 1000);
    }, error => {
      console.log(error);
      setTimeout(() => this.loading = false, 1000);
      const sbConfig: MdSnackBarConfig = {
        duration: 4000,
        data: error,
        announcementMessage: error.message
      };
      sbConfig.duration = 4000;
      const refDialog = this.snackBar.openFromComponent(AlertSnackBarComponent, sbConfig);
      refDialog.afterDismissed().subscribe(res => {
        console.log(res);
      });
    });
  }
  private checkSecondParam(a: string, b: string): string {
    return (!b) ? a : a + ',' + b;
  }
  clearData(form): void {
    form.resetForm();
    this.weatherService.clearSearchResult();
  }
}
