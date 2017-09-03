import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { WeatherService } from '../weather/weather.service';
// import { routerTransition } from '../animations/routing.animations';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  /*animations: [routerTransition()]*/
})
export class HomeComponent implements OnInit {
  /*@HostBinding('@routerTransition') get routerTrs() {
    return '';
  }*/
  errMessage: string;
  loading: boolean;
  langs = WeatherService.weatherLangs;
  firstCheck;
  constructor(
    private router: Router,
    private weatherService: WeatherService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    if (this.weatherService.apiKey !== null) {
      this.firstCheck = this.weatherService.testKey(this.weatherService.apiKey).subscribe((res: {cod: number}) => {
        if (res.cod) {
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        console.log(error);
      }).unsubscribe();
    }
  }
  checkApiKey(event) {
    this.loading = true;
    event.preventDefault();
    const apiKey = event.target.api_key.value;
    if (!apiKey) {
      this.openDialog({message: 'API KEY IS REQUIRED!', success: false});
      this.loading = false;
    } else {
      this.weatherService.testKey(apiKey).subscribe( (response: {cod: number}) => {
        if (response.cod) {
          this.weatherService.apiKey = apiKey;
          const refDialog = this.openDialog({message: 'API KEY IS TRUE! WELCOME!', success: true});
          refDialog.afterClosed().subscribe(() => {
            this.router.navigate(['/dashboard']);
          });
        }
        this.loading = false;
      }, error => {
        console.log(error);
        this.openDialog({message: error.error.message});
        this.loading = false;
      } );
    }
  }
  openDialog(data) {
    return this.dialog.open(DialogComponent, {
      width: '450px',
      data
    });
  }
  useTest(event) {
    event.preventDefault();
    this.weatherService.apiKey = '26e150de0e59e398931e697b667d7c4b';
    this.router.navigate(['/dashboard']);
  }
  setLang(event) {
    const root = location.origin + '/docs/';
    const lang = event.value === 'en' ? root : root + event.value;
    console.log(lang);
    location.assign(lang);
  }
}
