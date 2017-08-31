import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { WeatherGuard } from './weather/weather.guard';

const routes: Routes = [
  {
    path: 'weather',
    loadChildren: './weather/weather.module#WeatherModule',
    canLoad: [WeatherGuard]
  }
];

const config: ExtraOptions = {
  useHash: true,
  preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
