import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { MdToolbarModule, MdButtonModule, MdIconModule } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';
import { DialogComponent } from './dialog/dialog.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialComponentsModule } from '../shared/material-components/material-components.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WeatherRoutingModule
  ],
  declarations: [WeatherComponent, SettingsComponent, DialogComponent, WelcomeComponent],
  entryComponents: [DialogComponent],
  providers: []
})
export class WeatherModule { }
