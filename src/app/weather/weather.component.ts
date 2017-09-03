import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import { HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { WeatherService, City } from './weather.service';
import { DialogComponent } from './dialog/dialog.component';
// import { routerTransition } from '../animations/routing.animations';

declare var CITY_LIST;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
  /*animations: [routerTransition()]*/
})
export class WeatherComponent implements OnInit {
  /*@HostBinding('@routerTransition') get routerTransition() {
    return '';
  }*/
  get win() {
    console.log(window);
    return window;
  }
  progress: any;
  constructor(
    public weatherService: WeatherService,
    private router: Router,
    public dialog: MdDialog
  ) {
    // init lang param
    weatherService.lang = !weatherService.lang ? window.document.documentElement.lang : weatherService.lang;
    this.weatherService.initDataCities().subscribe((event: any) => {
      if (event.type === HttpEventType.DownloadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.progress = percentDone;
        //console.log(`File is ${percentDone} downloaded.`);
      } else if (event instanceof HttpResponse) {
        //console.log('File is uploaded', event);
        let context = this;
        console.log(event);
        setTimeout(() => context.progress = 'load', 1000);
        
        /*
        const script = window.document.createElement('script');
        script.src = 'assets/data/city.list.min.js';
        window.document.head.appendChild(script);
        script.addEventListener('load', function (ev) {
          console.log(ev);
          context.progress = ev.type;
          // context.weatherService.citiesList = CITY_LIST;
        });*/
      }
    }, error => {
      console.log(error);
    });;
  }

  ngOnInit() {
  }

  logout(): void {
    const refDialog = this.dialog.open(DialogComponent, {
      width: '400px'
    });
    refDialog.afterClosed().subscribe( (res: boolean) => {
      if (res) {
        this.weatherService.flushData();
        this.router.navigate(['/']);
      }
    } );
  }

}
