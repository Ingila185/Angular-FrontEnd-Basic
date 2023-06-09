import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators , FormControl} from '@angular/forms';
import {TutorialsService} from '../tutorials.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router'

import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-tutorials-details',
  templateUrl: './tutorials-details.component.html',
  styleUrls: ['./tutorials-details.component.css']
})

export class TutorialsDetailsComponent implements OnInit {
  state: string;
  id: string;
  title: string;
  tutorialDesc : string;
  isActiveTutorial: string;


  onClickSubmit(data : any)
 {
//Check if form is submitted for tutorial creation or tutorial updation

if(this.id == null)
{
  this.createTutorial(data);
}

else
  this.updateTutorial(this.id, data);



  //parse data object to form request object
  

}
   
  
  myForm = new FormGroup({
    tutorialName: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    tutorialIsActive : new FormControl(null,Validators.required)

  })
  constructor(private route: ActivatedRoute, private tutorialService: TutorialsService, private confirmationMessage: MatSnackBar) 
  {

  

   }
  
 
 

  ngOnInit(): void {
    
    this.state = this.route.snapshot.params['state'];
    this.id = this.route.snapshot.params['id'];
    if(this.id != null)
    {
      this.getSelectedTutorial(this.id);
    }


    if(this.state == 'view')
    this.myForm.disable();
  
}

getSelectedTutorial(id: string)
{
  this.title = "";
    this.tutorialDesc = "";
    this.isActiveTutorial = "";

  this.tutorialService.getTutorial(id).subscribe(
    (response: any)=>
    {
     // console.log(response)
      this.title = response.title;
      this.tutorialDesc = response.description;
      this.isActiveTutorial = response.published?"yes":"no";
    }
  )
}

createTutorial(data: any)
{
  of(this.tutorialService.createTutorial(
    {
      title: data.tutorialName,
      description: data.description,
      published: (data.tutorialIsActive=="yes")? true: false
    })).subscribe({

next: (response)=>
{
  response.subscribe(
    {
      next:(response: any)=>
      {
        console.log(response);
        if(response.id)
        {
          this.confirmationMessage.open("Tutorial Created","Dismiss");
        }
      },
      error:(error)=>
      {
        this.confirmationMessage.open(error,"Dismiss");

      },
      complete:()=>{}
    }
  )
  console.log("Next");
},
error: (error)=>
{
  this.confirmationMessage.open(error,"Dismiss");
},
complete: ()=>
{
 // console.log("Completed");
}

}
);
}


updateTutorial(id : string, body: any)
{

  of(this.tutorialService.updateTutorial(id,
    {
      title: body.tutorialName,
      description: body.description,
      published: (body.tutorialIsActive=="yes")? true: false
    })).subscribe({

next: (response)=>
{
  response.subscribe(
    {
      next:(response: any)=>
      {
        console.log(response);

          this.confirmationMessage.open(response.message,"Dismiss");
      },
      error:(error)=>
      {
        this.confirmationMessage.open(error.message,"Dismiss");

      },
      complete:()=>{}
    }
  )
 // console.log("Next");
},
error: (error)=>
{
  this.confirmationMessage.open(error,"Dismiss");
},
complete: ()=>
{
 // console.log("Completed");
}

}
);
}


}



