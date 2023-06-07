import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from  '@angular/common/http';
const configUrl= 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})


export class TutorialsService {

  constructor(private http: HttpClient) { }

//List all tutorials
  getAllTutorials() {
    return this.http.get(configUrl+"api/tutorials");
  }

  //Get tutorial based on ID

  getTutorial(tutorialId : any) {
    return this.http.get(configUrl, tutorialId);
  }

  //Create Tutorial
  createTutorial(body : JSON)
  {
    return this.http.post(configUrl,body);
  }
  //Update Tutorial

  updateTutorial(id: any, body: JSON )
  {
    return this.http.put(configUrl,body);
  }
  //Delete tutorial
  deleteTutorial(tutorialID:  any)
  {
    return this.http.delete(configUrl, tutorialID);
  }
}
