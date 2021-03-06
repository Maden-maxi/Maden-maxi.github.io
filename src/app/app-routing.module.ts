import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { WeatherGuard } from './weather/weather.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './weather/weather.module#WeatherModule',
    canLoad: [WeatherGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
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
