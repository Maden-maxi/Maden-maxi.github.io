import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(public weatherService: WeatherService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.weatherService.removeKey();
    this.router.navigate(['/']);
  }

}
