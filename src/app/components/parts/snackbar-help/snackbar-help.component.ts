import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar-help',
    templateUrl: './snackbar-help.component.html',
    styleUrls: ['./snackbar-help.component.css']
})
export class SnackbarHelpComponent  {

    constructor(public snackBar: MatSnackBar) {}

    dismiss() {
        this.snackBar.dismiss();
    }

}
