import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Tutorials } from './TutorialTemplate';
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
    return this.http.get(configUrl+"api/tutorials/"+ tutorialId);
  }

  //Create Tutorial
  createTutorial(body : Tutorials)
  {
   // console.log("Inside request");
    //console.log(body);
    let headers = new HttpHeaders();
    headers = headers.set('access-control-allow-origin','*');
    const requestOptions = {headers: headers};

    return this.http.post(configUrl+ "api/tutorials",body, requestOptions);
  }
  //Update Tutorial

  updateTutorial(id: any, body: Tutorials )
  {
    let headers = new HttpHeaders();
    headers = headers.set('access-control-allow-origin','*');
    const requestOptions = {headers: headers};

    return this.http.put(configUrl+"api/tutorials/"+id ,body, requestOptions);
  }
  //Delete tutorial
  deleteTutorial(tutorialID:  any)
  {
    return this.http.delete(configUrl + "api/tutorials/"+tutorialID );
  }
}
