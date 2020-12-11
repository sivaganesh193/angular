import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { PersonDetailsService } from '../person-details.service';
import { AcademicsModel } from './academics.model';
import { AcademicsService } from './academics.service';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent implements OnInit {
  sessions: AcademicsModel[];
  queryRef: QueryRef<AcademicsModel[], any>;
  category = 'Session';
  constructor(private apollo: Apollo, private router: Router,
              public personDetailsService: PersonDetailsService, private academicsService: AcademicsService) { }

  ngOnInit(): void {
    const req = gql`
    query
    courseReference($data: Course_Reference_Input) {
      courseReference(data: $data) {
        reference_id
        ref_code
        category
        ref_name
        description
      }
    }
    `;
    this.queryRef = this.apollo
    .watchQuery<AcademicsModel[]>({
      query: req,
      variables: {
        data: {
          category: this.category
        }
      }
    });
    this.queryRef.valueChanges.subscribe(((result: any) => {
      console.log(result.data.person);
      this.sessions = JSON.parse(JSON.stringify(result.data.courseReference));
      console.log(this.sessions);
  }));
  }
  onSessionSelect(s: AcademicsModel): void{
    this.academicsService.session = s;
    this.router.navigate(['/person-details', 'academics', 'course-list']);

  }

}
