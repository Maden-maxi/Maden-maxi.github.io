import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { MdToolbarModule, MdButtonModule, MdIconModule } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    WeatherRoutingModule
  ],
  declarations: [WeatherComponent, SettingsComponent],
  providers: []
})
export class WeatherModule { }
