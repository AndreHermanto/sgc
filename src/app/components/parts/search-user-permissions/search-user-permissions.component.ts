import {Component, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VecticAnalyticsService } from '../../../services/analytics-service';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-search-user-permissions',
  templateUrl: './search-user-permissions.component.html',
  styleUrls: ['./search-user-permissions.component.css']
})
export class SearchUserPermissionsComponent implements OnInit {
  email: string;
  @Input() roles: string;
  @Output() onGetUserRoles = new EventEmitter<string>();

  constructor(public dialog: MatDialog,
    private vas: VecticAnalyticsService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(OverviewDialog, {
      width: '600px',
      data: {
        email: this.email
      }
    });
  }

}

@Component({
  selector: 'app-overview-dialog',
  templateUrl: 'overview-dialog.component.html',
  styleUrls: ['./overview-dialog.component.css']
})
export class OverviewDialog implements OnInit{
  roles = [];
  loading = false;
  error = "";
  constructor(
    public dialogRef: MatDialogRef<OverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private vas: VecticAnalyticsService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loading = true;
    this.vas.getUserRoles(this.data.email).subscribe((e) => {
      this.loading = false;
      if(Array.isArray(e)){
        this.roles = e;
      }else{
        this.error = e.error;
      }
    })
  }

}
