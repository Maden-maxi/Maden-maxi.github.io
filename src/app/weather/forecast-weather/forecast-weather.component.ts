import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
  }

}
