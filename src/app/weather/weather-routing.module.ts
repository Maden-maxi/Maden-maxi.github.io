import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'weather'
      },
      {
        path: 'weather',
        component: WelcomeComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CurrentWeatherComponent
          },
          {
            path: 'forecast',
            component: ForecastWeatherComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
