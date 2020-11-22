import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-publication-model',
  templateUrl: './publication-model.component.html',
  styleUrls: ['./publication-model.component.scss']
})
export class PublicationModelComponent implements OnInit {
  publicationForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public input: any, private apollo: Apollo, public dialogRef: MatDialogRef<PublicationModelComponent>) { }
  publishYear: string;
  ngOnInit(): void {
    this.publicationForm = new FormGroup({
      Publication_ID : new FormControl(this.input.publication != null ? this.input.publication.Publication_ID : ''),
      Person_ID: new FormControl(this.input.publication != null ? this.input.publication.Person_ID : 123),
      Publication_Type_Ref : new FormControl(this.input.publication != null ? this.input.publication.Publication_Type_Ref : ''),
      Level_Ref: new FormControl(this.input.publication != null ? this.input.publication.Level_Ref : ''),
      Paper_Title: new FormControl(this.input.publication != null ? this.input.publication.Paper_Title : ''),
      First_Author: new FormControl(this.input.publication != null ? this.input.publication.First_Author : ''),
      Second_Author: new FormControl(this.input.publication != null ? this.input.publication.Second_Author : ''),
      Other_Authors: new FormControl(this.input.publication != null ? this.input.publication.Other_Authors : ''),
      Journal_Name: new FormControl(this.input.publication != null ? this.input.publication.Journal_Name : ''),
      Volume: new FormControl(this.input.publication != null ? this.input.publication.Volume : ''),
      Issue: new FormControl(this.input.publication != null ? this.input.publication.Issue : ''),
      DOI: new FormControl(this.input.publication != null ? this.input.publication.DOI : ''),
      Year_Of_Publish: new FormControl(this.input.publication != null ?
        this.input.publication.Year_Of_Publish + '-01-01T18:30:00.000Z' : ''),
      Start_Page_No: new FormControl(this.input.publication != null ? this.input.publication.Start_Page_No : ''),
      End_Page_No: new FormControl(this.input.publication != null ? this.input.publication.End_Page_No : ''),
      Publisher: new FormControl(this.input.publication != null ? this.input.publication.Publisher : ''),
      Impact_Factor: new FormControl(this.input.publication != null ? this.input.publication.Impact_Factor : '')
    });
  }
  onSubmit() {
    const publishYear = new Date(this.publicationForm.value.Year_Of_Publish);
    console.log(publishYear.getFullYear());

    this.publicationForm.value.Year_Of_Publish = publishYear.getFullYear();
    this.dialogRef.close(this.publicationForm.value);
  }

}
