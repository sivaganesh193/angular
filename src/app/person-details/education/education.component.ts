import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EducationModelComponent } from './education-model/education-model.component';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import {EducationModel} from './education.model';
import { PersonDetailsService } from '../person-details.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss', '../person-details.component.scss']
})
export class EducationComponent implements OnInit {
  qualifications: EducationModel[];
  queryRef: QueryRef<EducationModel[]>;

  constructor(public dialog: MatDialog,  private apollo: Apollo, public personDetailsService: PersonDetailsService) {  }

  ngOnInit(): void {
    const id = this.personDetailsService.getPersonID();
    const req = gql`
    query personQualifications($data: Person_QualificationsInputQuery) {
      personQualifications(data: $data) {
        Qualification_ID
        Person_ID
        Institution
        University
        Start_Date
        End_Date
        Thesis_Title
        Faculty_Research
        Specialization
      }
    }
    `;
    this.queryRef = this.apollo
      .watchQuery({
        query: req,
        variables: {
          data: {
            Person_ID: id
          }
        }
      });
    this.queryRef.valueChanges.subscribe(result => {
        console.log(result.data['personQualifications']);
        this.qualifications = JSON.parse(JSON.stringify(result.data['personQualifications']));
      });

  }
  openDialog(id) {
    const qualification = this.qualifications.filter((q) => q.Qualification_ID === id);
    console.log(qualification);
    let dialogUpdateRef = this.dialog.open(EducationModelComponent, {data: qualification[0]});
    dialogUpdateRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const req = gql `
    mutation updatePersonQualification($data: Person_QualificationUpdateInput!) {
      updatePersonQualification(data: $data) {
        Qualification_ID
        Institution
        University
        Thesis_Title
        Specialization
        Faculty_Research
      }
    }
    `;
        this.apollo
    .mutate({
      mutation: req,
      variables: {
        data: {
        Qualification_ID: result.Qualification_ID,
        Institution: result.Institution,
        Start_Date: result.Start_Date,
        End_Date: result.End_Date,
        University: result.University,
        Thesis_Title: result.Thesis_Title,
        Specialization: result.Specialization,
        Faculty_Research: result.Faculty_Research
        }
      }
    }).subscribe(({ data }) => {
      this.queryRef.refetch();
    });
      }
    });
  }
  createDialog(){
    let dialogCreateRef = this.dialog.open(EducationModelComponent);
    dialogCreateRef.afterClosed().subscribe(result => {
      if (result) {
        const req = gql `
    mutation createPersonQualification($data: Person_QualificationInput!) {
      createPersonQualification(data: $data) {
        Institution
        University
        Thesis_Title
        Specialization
        Faculty_Research
      }
    }
    `;
        this.apollo
    .mutate({
      mutation: req,
      variables: {
        data: {
        Person_ID: result.Person_ID,
        Institution: result.Institution,
        University: result.University,
        Thesis_Title: result.Thesis_Title,
        Specialization: result.Specialization,
        Faculty_Research: result.Faculty_Research
        }
      }
    }).subscribe(({ data }) => {
      this.queryRef.refetch();
    });

      }
    });

  }
}
