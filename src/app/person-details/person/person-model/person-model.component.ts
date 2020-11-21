import { Component, Inject, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonModel } from '../person.model';

@Component({
  selector: 'app-person-model',
  templateUrl: './person-model.component.html',
  styleUrls: ['./person-model.component.scss'],
})
export class PersonModelComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,
              public dialogRef: MatDialogRef<PersonModelComponent>) {
               }
  ngOnInit(): void {
  }
  onSubmit() {
    this.dialogRef.close(this.data.person);
        }

}
