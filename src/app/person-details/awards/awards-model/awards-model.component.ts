import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-awards-model',
  templateUrl: './awards-model.component.html',
  styleUrls: ['./awards-model.component.scss']
})
export class AwardsModelComponent implements OnInit {
  awardForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public input: any, private apollo: Apollo, public dialogRef: MatDialogRef<AwardsModelComponent>) { }

  ngOnInit(): void {
    this.awardForm = new FormGroup({
      Award_ID: new FormControl(this.input.award != null ? this.input.award.Award_ID : ''),
      Person_ID: new FormControl(this.input.award != null ? this.input.award.Person_ID : 123),
      Title: new FormControl(this.input.award != null ? this.input.award.Title : '', Validators.required),
      Organization: new FormControl(this.input.award != null ? this.input.award.Organization : '', Validators.required),
      Place: new FormControl(this.input.award != null ? this.input.award.Place : '', Validators.required),
      Start_Year: new FormControl(this.input.award != null ?
         this.input.award.Start_Year + '-01-01T18:30:00.000Z' : '', Validators.required),
      Details: new FormControl(this.input.award != null ? this.input.award.Details : '', Validators.required)
    });
  }
  onSubmit() {
    const StartDate = new Date(this.awardForm.value.Start_Year);

    this.awardForm.value.Start_Year = StartDate.getFullYear();
    this.dialogRef.close(this.awardForm.value);
  }

}
