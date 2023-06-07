import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TutorialsListComponent} from './tutorials-list/tutorials-list.component';
import {TutorialsDetailsComponent} from './tutorials-details/tutorials-details.component';
const routes: Routes = 
[
{
  path: '',
  component: TutorialsListComponent
},

{
  path:'details',
  component: TutorialsDetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
