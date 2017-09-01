import { NgModule } from '@angular/core';
import {
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdButtonModule,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdDialogModule,
  MdToolbarModule,
  MdRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdDialogModule,
    MdToolbarModule,
    MdRadioModule
  ],
  exports: [
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdDialogModule,
    MdToolbarModule,
    MdRadioModule
  ]
})
export class MaterialComponentsModule { }
