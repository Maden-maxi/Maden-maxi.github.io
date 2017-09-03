import {Component, Inject, OnInit} from '@angular/core';
import {MD_SNACK_BAR_DATA, MdSnackBarRef} from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-snackbar.component.html',
  styleUrls: ['./alert-snackbar.component.scss'],
  providers: []
})
export class AlertSnackBarComponent implements OnInit {

  constructor(
    @Inject(MD_SNACK_BAR_DATA) public data: any,
    public snackbarRef: MdSnackBarRef<AlertSnackBarComponent>
  ) { }

  ngOnInit() {
  }

}
