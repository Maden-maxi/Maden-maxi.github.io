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
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
  }
  search(f: NgForm) {
    let queryParams;
    switch (this.selectedParam) {
      case this.searchByParams[1].param:
        queryParams = {id: f.value.city_id};
        break;
      case this.searchByParams[2].param:
        queryParams = {lat: f.value.lat, lon: f.value.lon};
        break;
      case this.searchByParams[3].param:
        queryParams = {zip: this.checkSecondParam(f.value.country_code.zip_code, f.value.country_code)};
        break;
      default:
        queryParams = {q: this.checkSecondParam(f.value.country_code.city_name, f.value.country_code.city_code)};
    }
    console.log(f, queryParams);
    this.weatherService.weather(queryParams, f.value.typeWeather).subscribe(res => {
      this.weatherData = res;
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  checkSecondParam(a: string, b: string): string {
    return (b) ? a : a + ',' + b;
  }
}
