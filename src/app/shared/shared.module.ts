import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    //BrowserAnimationsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    //BrowserAnimationsModule
  ],
  declarations: []
})
export class SharedModule { }
