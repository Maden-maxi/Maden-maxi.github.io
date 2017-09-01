import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  searchByParams = [
    {param: 'q', name: 'City Name', info: 'By city name {city name},{country code}'},
    {param: 'id', name: 'City ID', info: 'By city ID'},
    {param: 'coordinates', name: 'Coordinates', info: 'By geographic coordinates'},
    {param: 'zip', name: 'Zip Code', info: 'By ZIP code {zip code},{country code}'}
  ];
  selectedParam = this.searchByParams[0].param;
  selectedValues = {};
  weatherData;
  dataRoute: 'weather' | 'forecast';
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
  }
  search(f: NgForm, event) {
    // event.preventDefault();
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
    const tw = this.dataRoute;
    // console.log(f, queryParams);
    this.weatherService.weather(queryParams, tw).subscribe(res => {
      this.weatherData = res;
      Object.assign(window, {res});
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  private checkSecondParam(a: string, b: string): string {
    return (!b) ? a : a + ',' + b;
  }
}
