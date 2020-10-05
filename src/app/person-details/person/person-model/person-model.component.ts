import { Component, Inject, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonModel } from '../person.model';
@Component({
  selector: 'app-person-model',
  templateUrl: './person-model.component.html',
  styleUrls: ['./person-model.component.scss']
})
export class PersonModelComponent implements OnInit {
  prefix = ['Mr.', 'Mrs.', 'Dr.', 'Ms.'];
  community = ['BACKWARD COMMUNITY', 'SCHEDULED TRIBE',
                'SCHEDULED CASTE', 'MOST BACKWARD COMMUNITY', 'OTHER COMMUNITY'];
  caste = ['BACKWARD COMMUNITY', 'SCHEDULED TRIBE',
            'SCHEDULED CASTE', 'MOST BACKWARD COMMUNITY', 'OTHER COMMUNITY'];
  maritalStatus = ['Single', 'Married'];

  constructor(@Inject(MAT_DIALOG_DATA) public person: PersonModel, private apollo: Apollo,
              public dialogRef: MatDialogRef<PersonModelComponent>) { }

  ngOnInit(): void {
    console.log(this.person);
  }
  onSubmit() {
    const req = gql `
    mutation updatePerson($data: updatePersonInput!) {
      updatePerson(data: $data) {
        Person_ID
      }
    }
    `;
    this.apollo
    .mutate({
      mutation: req,
      variables: {
        data: {
          Person_ID: this.person.Person_ID,
          PAN_Card: this.person.PAN_Card,
          First_Name: this.person.First_Name,
          Last_Name: this.person.Last_Name,
          Caste: this.person.Caste,
          Primary_MailID: this.person.Primary_MailID,
          Secondary_MailID: this.person.Secondary_MailID,
          Aadhar_Card: this.person.Aadhar_Card,
          Passport_Number: this.person.Passport_Number,
          //Primary_ContactNumber: this.person.Primary_ContactNumber,
          Secondary_ContactNumber: this.person.Secondary_ContactNumber,
          Intercom_Number: this.person.Intercom_Number,
          Alias_Name: this.person.Alias_Name,
          Address_Line1: this.person.Address_Line1,
          Address_Line2: this.person.Address_Line2,
          Address_Line3: this.person.Address_Line3,
          Address_Line4: this.person.Address_Line4,
          Room_Num: this.person.Room_Num
        }
      }
    }).subscribe(({ data }) => {
      console.log(data);
      this.dialogRef.close();
    });
    }

}
