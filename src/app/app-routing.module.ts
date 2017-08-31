import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherGuard } from './weather/weather.guard';

const routes: Routes = [
  {
    path: 'weather',
    loadChildren: './weather/weather.module#WeatherModule',
    canLoad: [WeatherGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
