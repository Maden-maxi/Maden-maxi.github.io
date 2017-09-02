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
  MdChipsModule,
  MdTabsModule,
  MdTooltipModule,
  MdSnackBarModule
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
    MdChipsModule,
    MdTabsModule,
    MdTooltipModule,
    MdSnackBarModule
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
    MdChipsModule,
    MdTabsModule,
    MdTooltipModule,
    MdSnackBarModule
  ]
})
export class MaterialComponentsModule { }
