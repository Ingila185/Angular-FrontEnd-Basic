import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tutorials-details',
  templateUrl: './tutorials-details.component.html',
  styleUrls: ['./tutorials-details.component.css']
})
export class TutorialsDetailsComponent implements OnInit {
  //myForm: FormGroup;

  onClickSubmit(data : any)
 {
  console.log("Submitted");
  console.log(data);
}
   
  
  myForm = new FormGroup({
    tutorialName: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    tutorialIsActive : new FormControl(null,Validators.required)

  })
  constructor(private fb: FormBuilder) 
  {

  

   }
  
 
 

  ngOnInit(): void {

  
}



get myFormControl() {
  return this.myForm.controls;
}


}



