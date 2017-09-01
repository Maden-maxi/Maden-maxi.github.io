import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherGuard } from '../weather/weather.guard';
import { HomeGuard } from '../home/home.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdIconModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [],
  providers: [
    HomeGuard,
    WeatherGuard,
    WeatherService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config: ModuleWithProviders): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
