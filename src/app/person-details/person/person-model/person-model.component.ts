import { Component, Inject, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonModel } from '../person.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-model',
  templateUrl: './person-model.component.html',
  styleUrls: ['./person-model.component.scss'],
})
export class PersonModelComponent implements OnInit {
  personForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,
              public dialogRef: MatDialogRef<PersonModelComponent>) {
               }
  ngOnInit(): void {
    this.personForm = new FormGroup({
      Person_ID: new FormControl(this.data.person.Person_ID),
      Prefix_Ref: new FormControl(this.data.person.Prefix_Ref),
      First_Name: new FormControl(this.data.person.First_Name, Validators.required),
      Last_Name: new FormControl(this.data.person.Last_Name, Validators.required),
      Gender_Ref: new FormControl(this.data.person.Gender_Ref),
      DOB: new FormControl(this.data.person.DOB, Validators.required),
      Community_Ref: new FormControl(this.data.person.Community_Ref),
      Caste: new FormControl(this.data.person.Caste, Validators.required),
      Primary_MailID: new FormControl(this.data.person.Primary_MailID, Validators.email ),
      Secondary_MailID: new FormControl(this.data.person.Secondary_MailID, Validators.email),
      Aadhar_Card: new FormControl(this.data.person.Aadhar_Card, [Validators.required, Validators.pattern('^[0-9]{12}$')]),
      PAN_Card: new FormControl(this.data.person.PAN_Card, Validators.required),
      Passport_Number: new FormControl(this.data.person.Passport_Number, Validators.required),
      Primary_ContactNumber: new FormControl(this.data.person.Primary_ContactNumber, Validators.required),
      Secondary_ContactNumber: new FormControl(this.data.person.Secondary_ContactNumber, Validators.required),
      Intercom_Number: new FormControl(this.data.person.Intercom_Number, Validators.required),
      Alias_Name: new FormControl(this.data.person.Alias_Name, Validators.required),
      Address_Line1: new FormControl(this.data.person.Address_Line1, Validators.required),
      Address_Line2: new FormControl(this.data.person.Address_Line2, Validators.required),
      Address_Line3: new FormControl(this.data.person.Address_Line3, Validators.required),
      Address_Line4: new FormControl(this.data.person.Address_Line4, Validators.required),
      Marital_Status_Ref: new FormControl(this.data.person.Marital_Status_Ref),
      Room_Num: new FormControl(this.data.person.Room_Num, Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.personForm.value);
    this.dialogRef.close(this.personForm.value);
        }

}
