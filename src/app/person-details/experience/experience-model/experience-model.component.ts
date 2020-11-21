import { Component, Inject, OnInit } from '@angular/core';

import {Apollo} from 'apollo-angular';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceModel } from '../experience.model';
@Component({
  selector: 'app-experience-model',
  templateUrl: './experience-model.component.html',
  styleUrls: ['./experience-model.component.scss']
})
export class ExperienceModelComponent implements OnInit {
  data: ExperienceModel = {
    Experience_ID: 0,
  Person_ID: 123,
  Designation_Ref: 0,
  Organization: '',
  Department: '',
  Start_Date: null,
  End_Date: null,
  Emp_Category_Ref: 0,
  Work_Nature_Ref: 0,
  Position_Held: '',
  };

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public input: any, private apollo: Apollo, public dialogRef: MatDialogRef<ExperienceModelComponent>) { }
  getDate(inputDate) {
    var temp = parseFloat(inputDate) / 1000;
    var myDate = new Date(0);
    myDate.setUTCSeconds(temp);
    return myDate;
  }
  ngOnInit(): void {
    if (this.input.experience) {
      this.data = JSON.parse(JSON.stringify(this.input.experience));
      console.log(this.data);
      this.data.Start_Date = this.getDate(this.data.Start_Date);
      this.data.End_Date = this.getDate(this.data.End_Date);
    }
  }
  onSubmit() {
    this.dialogRef.close(this.data);
  }

}
