import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {TutorialsService} from '../tutorials.service';
import { of } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponentComponent} from '../Dialog/dialog-component/dialog-component.component';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Tutorials } from '../TutorialTemplate';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})


export class TutorialsListComponent implements OnInit {

  @ViewChild('tablePaginator') paginator: MatPaginator;


  constructor(private service: TutorialsService, public dialog: MatDialog,  private confirmationMessage: MatSnackBar) { }
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'updatedAt', 'edit','delete', 'view' ];

  dataSource: MatTableDataSource<any[]>;

  ngOnInit(): void {

  this.listAllTutorials();  

      

  }

  listAllTutorials()
  {

    of(this.service.getAllTutorials()).subscribe({
      next: (response) => 
      {
        response.subscribe(
          {
            next: (response : any)=>{
              this.dataSource = new MatTableDataSource(response);
              this.dataSource.paginator = this.paginator;
            }
          })
      },
      error: (error) => {
        console.log(error)
      },
      complete: ()=> 
      {


        //console.log("Completed");
      }
  })
  }
  openDialog(id: string) {
    console.log(id);
   let dialogRef =  this.dialog.open(DialogComponentComponent);
   dialogRef.afterClosed().subscribe(result => 
    {
      console.log(result);
      if(result == "Y")
      {
        this.deleteTutorialAndUpdateTable(id);
      }
    })
}

deleteTutorialAndUpdateTable(id: string)
{

  this.service.deleteTutorial(id).subscribe(
    (result : any)=>
    {

      const indexId = id;

      this.confirmationMessage.open(result.message, "Dismiss")
      const objWithIdIndex = this.dataSource.data.findIndex((obj : any) => obj.id === indexId);
    //  console.log("Deleted: "+ objWithIdIndex);
      this.dataSource.data.splice(objWithIdIndex,1);
      //Delete from Datasource and refresh the mat-table
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource


    },
    (error: any)=>
    {
      this.confirmationMessage.open(error.message, "Dismiss")

    }
  )

 // this.deleteRowDataTable(id);




}
}