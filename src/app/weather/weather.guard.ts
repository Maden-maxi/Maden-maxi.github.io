import { Injectable } from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WeatherService } from './weather.service';

@Injectable()
export class WeatherGuard implements CanLoad {
  constructor(private weatherService: WeatherService, private router: Router) {}
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const apiKey = this.weatherService.apiKey;
    console.log(apiKey);
    if (!apiKey) {
      this.router.navigate(['/']);
    }
    return !!apiKey;
  }
}
