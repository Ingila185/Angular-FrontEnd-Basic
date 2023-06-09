import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {TutorialsService} from '../tutorials.service';
import { of } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})


export class TutorialsListComponent implements OnInit {

  @ViewChild('tablePaginator') paginator: MatPaginator;


  constructor(private service: TutorialsService) { }
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'updatedAt', 'edit','delete', 'view' ];

  dataSource: MatTableDataSource<any[]>;

  ngOnInit(): void {


    of(this.service.getAllTutorials()).subscribe({
      next: (response) => 
      {

        console.log("Response");
        response.subscribe(
          {
            next: (response : any)=>{
              console.log(response);
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

        console.log("Completed");
      }
  })
      

  }


}

