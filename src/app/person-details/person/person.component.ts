import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import { PersonModelComponent } from './person-model/person-model.component';
import { PersonModel } from './person.model';
import {PersonDetailsService} from '../person-details.service';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss', '../person-details.component.scss']
})

export class PersonComponent implements OnInit {
  prefix = ['Mr.', 'Mrs.', 'Dr.', 'Ms.'];
  community = ['BACKWARD COMMUNITY', 'SCHEDULED TRIBE',
                'SCHEDULED CASTE', 'MOST BACKWARD COMMUNITY', 'OTHER COMMUNITY'];
  caste = ['BACKWARD COMMUNITY', 'SCHEDULED TRIBE',
            'SCHEDULED CASTE', 'MOST BACKWARD COMMUNITY', 'OTHER COMMUNITY'];
  maritalStatus = ['Single', 'Married'];

  person: PersonModel;
  queryRef: QueryRef<PersonModel>;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private apollo: Apollo, public dialog: MatDialog, public personDetailsService: PersonDetailsService) { }

  ngOnInit(): void {
    const id: number = this.personDetailsService.getPersonID();
    console.log(id);
    const req = gql`
    query person($data: personInput!) {
      person(data: $data) {
        Person_ID
        Prefix_Ref
        First_Name
        Last_Name
        DOB
        Gender_Ref
        Community_Ref
        Caste
        Primary_MailID
        Secondary_MailID
        Aadhar_Card
        PAN_Card
        Passport_Number
        Primary_ContactNumber
        Secondary_ContactNumber
        Intercom_Number
        Alias_Name
        Address_Line1
        Address_Line2
        Address_Line3
        Address_Line4
        Room_Num
      }
    }
    `;
    this.queryRef = this.apollo
      .watchQuery<PersonModel>({
        query: req,
        variables: {
          data: {
            Person_ID: id
          }
        }
      });
    this.queryRef
      .valueChanges.subscribe(((result: any) => {
        console.log(result.data.person);
        this.person = JSON.parse(JSON.stringify(result.data['person']));
        this.person.DOB = '1989-06-05' ;
        this.person.Community_Ref = 1;
        this.person.Gender_Ref = 2;
        this.person.Marital_Status_Ref = 2;
      }));

 // });
}
onOpenModel() {

  let dialogRef = this.dialog.open(PersonModelComponent, { data: this.person} );
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.queryRef.refetch();
    }
  });

}


}
