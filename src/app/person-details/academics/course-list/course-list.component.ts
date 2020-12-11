import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AcademicsModel } from '../academics.model';
import { AcademicsService } from '../academics.service';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { CourseListModel } from './course-list.model';
import { PersonDetailsService } from '../../person-details.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['../academics.component.scss']
})
export class CourseListComponent implements OnInit {
  session: AcademicsModel;
  courseList: CourseListModel[] = [];
  courseCodes: any;
  queryRef: QueryRef<any, any>;
  constructor(private apollo: Apollo, private router: Router, private activatedRoute: ActivatedRoute,
              private academicsService: AcademicsService, private personDetails: PersonDetailsService) {
  }

  ngOnInit(): void {
    this.session = this.academicsService.session;
    if (!this.session) {
      this.router.navigateByUrl('person-details/academics');
    }
    const req = gql`
    query staffCourses($data: staffCoursesQueryInput!) {
      staffCourses(data: $data) {
        course_code
      }
    }
    `;
    this.apollo
    .watchQuery<any>({
      query: req,
      variables: {
        data: {
          staff_id: this.personDetails.Person_ID,
          session_ref: this.session.ref_code
        }
      }
    }).valueChanges.subscribe(((result: any) => {
      console.log(result.data.staffCourses);
      this.courseCodes = JSON.parse(JSON.stringify(result.data.staffCourses));
      console.log(this.courseCodes);
      const reqNew = gql`
      query course($data: courseQueryInput!) {
      course(data: $data) {
        course_code
        title
      }
    }
    `;
      for (const x of this.courseCodes) {
        this.apollo
    .watchQuery<any>({
      query: reqNew,
      variables: {
        data: {
          course_code : x.course_code
        }
      }
    }).valueChanges.subscribe(((course: any) => {
      this.courseList.push(course.data.course);
      console.log(this.courseList);
    }));

    }



  }));
  }
  findKeyWord(str: string): string {
    const strArray = str.trim().split(' ');
    const key = strArray[0][0] + strArray[strArray.length - 1][0];
    return key;
  }

}
