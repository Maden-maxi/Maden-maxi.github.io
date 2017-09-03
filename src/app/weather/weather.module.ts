import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { DialogComponent } from './dialog/dialog.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { LineChartModule } from '@swimlane/ngx-charts';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { AlertSnackBarComponent } from './alert-snackbar/alert-snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8zWNC7q2vc4bd890BgDf3iAicSyOo_U8'
    }),
    WeatherRoutingModule,
    LineChartModule
  ],
  declarations: [
    WeatherComponent,
    DialogComponent,
    WelcomeComponent,
    WeatherCardComponent,
    CelsiusPipe,
    WeatherChartComponent,
    ChartDialogComponent,
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    AlertSnackBarComponent
  ],
  entryComponents: [
    DialogComponent,
    ChartDialogComponent,
    AlertSnackBarComponent
  ],
  providers: []
})
export class WeatherModule { }
