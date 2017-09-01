import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from './weather.service';
// import { routerTransition } from '../animations/routing.animations';
import {MdDialog} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';

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
  constructor(
    public weatherService: WeatherService,
    private router: Router,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  logout(): void {
    const refDialog = this.dialog.open(DialogComponent, {
      width: '400px'
    });
    refDialog.afterClosed().subscribe( (res: boolean) => {
      if (res) {
        this.weatherService.removeKey();
        this.router.navigate(['/']);
      }
    } );
  }

}
