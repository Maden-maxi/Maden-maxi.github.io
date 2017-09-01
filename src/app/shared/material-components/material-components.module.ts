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
  MdRadioModule,
  MdListModule,
  MdChipsModule
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
    MdRadioModule,
    MdListModule,
    MdListModule,
    MdChipsModule
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
    MdRadioModule,
    MdListModule,
    MdChipsModule
  ]
})
export class MaterialComponentsModule { }
