import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationComponent } from './education/education.component';
import { PersonDetailsComponent} from './person-details.component';
import {PersonComponent} from './person/person.component';
import {AuthGuard} from '../auth/auth.guard';
const routes: Routes = [
  {
    path: 'person-details',
    component: PersonDetailsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'person',
        component: PersonComponent
      },
      {
        path: 'education',
        component: EducationComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
  })
export class PersonDetailsRoutingModule {

}
