import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private weatherService: WeatherService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.weatherService.apiKey !== null ) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
