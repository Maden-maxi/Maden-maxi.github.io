import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather/weather.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  errMessage: string;
  loading: boolean;
  firstCheck;
  constructor(
    private router: Router,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    console.log('home init', !this.weatherService.apiKey);
    if (this.weatherService.apiKey !== null) {
      this.firstCheck = this.weatherService.testKey(this.weatherService.apiKey).subscribe((res: {cod: number}) => {
        if (res.cod) {
          this.router.navigate(['weather']);
        }
      }, error => {
        console.log(error);
      });
    }
  }
  checkApiKey(event) {
    this.loading = true;
    event.preventDefault();
    const apiKey = event.target.api_key.value;
    console.log(apiKey);
    this.weatherService.testKey(apiKey).subscribe( (response: {cod: number}) => {
      console.log(response.cod);
      if (response.cod) {
        this.weatherService.apiKey = apiKey;
        this.router.navigate(['/weather']);
      }
      this.loading = false;
    }, error => {
      console.log(error);
      this.errMessage = error.error.message;
      this.loading = false;
    } );
  }
  ngOnDestroy() {
    this.firstCheck.unsubscribe();
  }
}
