import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() weather;
  @Input() main;
  @Input() clouds;
  @Input() wind;
  @Input() dt;
  @Input() city;
  @Input() sys;
  @Input() rain;
  @Input() snow;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }
  public doIconPath(icon) {
    return this.weatherService.icon(icon);
  }
}
