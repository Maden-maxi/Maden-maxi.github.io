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
  selectedLang = this.langs[0].code;
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
          this.router.navigate(['weather']);
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
    } else if (!this.selectedLang) {
      this.openDialog({message: 'Select your language!', success: false});
    } else {
      this.weatherService.testKey(apiKey).subscribe( (response: {cod: number}) => {
        if (response.cod) {
          this.weatherService.apiKey = apiKey;
          this.weatherService.lang = this.selectedLang;
          const refDialog = this.openDialog({message: 'API KEY IS TRUE! WELCOME!', success: true});
          refDialog.afterClosed().subscribe(() => {
            this.router.navigate(['/weather']);
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
}
