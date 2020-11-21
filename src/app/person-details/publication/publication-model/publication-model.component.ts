import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {PublicationModel} from '../publication.model';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
const moment = _moment;
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    const formatString = 'YYYY';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'app-publication-model',
  templateUrl: './publication-model.component.html',
  styleUrls: ['./publication-model.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class PublicationModelComponent implements OnInit {
  date = new FormControl(moment());
  data: PublicationModel = {
    Publication_ID : 0,
    Person_ID: 123,
    Publication_Type_Ref : 0,
    Level_Ref: 0,
    Paper_Title: '',
    First_Author: '',
    Second_Author: '',
    Other_Authors: '',
    Journal_Name: '',
    Volume: null,
    Issue: null,
    DOI: '',
    Year_Of_Publish: 0,
    Start_Page_No: null,
    End_Page_No: null,
    Publisher: '',
    Impact_Factor: 0
  }
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public input: any, private apollo: Apollo, public dialogRef: MatDialogRef<PublicationModelComponent>) { }
  publishYear: string;
  ngOnInit(): void {
    if(this.input.publication) {
      this.data = JSON.parse(JSON.stringify(this.input.publication));
      console.log(this.data);
      this.publishYear = this.data.Year_Of_Publish + '-01-01T18:30:00.000Z';
    }
    else {

    }
  }
  yearSelected(params, picker) {
    console.log(params);
    this.date.setValue(params);
    this.publishYear = this.date.value;
    picker.close();
    console.log(this.date.value);
  }
  onSubmit() {
    const publishYear = new Date(this.publishYear);
    console.log(publishYear.getFullYear());

    this.data.Year_Of_Publish = publishYear.getFullYear();
    this.dialogRef.close(this.data);
  }

}
