import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicsComponent } from './academics/academics.component';
import { CourseListComponent } from './academics/course-list/course-list.component';
import { AwardsComponent } from './awards/awards.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';

import { PersonDetailsComponent} from './person-details.component';
import { PersonComponent } from './person/person.component';
import {PublicationComponent} from './publication/publication.component';

const routes: Routes = [
  {
    path: 'person-details',
    component: PersonDetailsComponent,
    children: [
      {
        path: 'awards',
        component: AwardsComponent
      },
      {
        path: 'experience',
        component: ExperienceComponent
      },
      {
        path: 'publication',
        component: PublicationComponent
      },
      {
        path: 'person',
        component: PersonComponent
      },
      {
        path: 'education',
        component: EducationComponent
      },
      {
        path: 'academics',
        component: AcademicsComponent
      },
      {
        path: 'academics/course-list',
        component: CourseListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class PersonDetailsRoutingModule {

}
