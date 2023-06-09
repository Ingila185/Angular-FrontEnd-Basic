import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css'],

})
export class DialogComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    
  }

  noClicked()
  {
    this.dialogRef.close("N");
  }
  yesClicked()
  {
    this.dialogRef.close("Y");
  }
}
