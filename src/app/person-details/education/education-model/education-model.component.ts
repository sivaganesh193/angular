import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { EducationModel } from '../education.model';
const moment = _moment;
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    const formatString = 'YYYY';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'app-education-model',
  templateUrl: './education-model.component.html',
  styleUrls: ['./education-model.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class EducationModelComponent implements OnInit {
  qualificationLevel = ['UNDER GRADUATE', 'POST GRADUATE', 'DOCTRATE'];
  degree = ['B.C.A', 'B.E.', 'B.Sc.', 'B.Tech.', 'M.C.A', 'M.E', 'M.Tech', 'M.Sc.',
            'M.S', 'Ph.D.', 'Postdoctoral Research'];
  branch = ['COMPUTER SCIENCE AND ENGINEERING', 'COMPUTER SCIENCE'
  , 'ELECTRICAL AND ELECTRONICS ENGINEERING',
   'ELECTRONICS AND COMMUNICATION ENGINEERING', 'ELECTRONICS AND INSTRUMENTATION ENGINEERING', 'INFORMATION TECHNOLOGY', 'OTHER' ];
  classObtained = ['Honors',
    'First Class with Distinction',
    'First Class',
    'Second Class',
    'Others'
    ];
    default = {
      qualificationLevel: null,
      degree: null,
      branch: null,
      classObtained: null
    };
  date = new FormControl(moment());
  data: EducationModel = {
    Qualification_ID: 0,
    Institution: '',
    University: '',
    Thesis_Title: '',
    Specialization: '',
    Faculty_Research: '',
    Start_Date: 0,
    End_Date: 0,
    Person_ID: 123
  };
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public input: any, private apollo: Apollo, public dialogRef: MatDialogRef<EducationModelComponent>) { }
  startYear: string;
  endYear: string;
  startYearSelected(params, picker) {
    console.log(params);
    this.date.setValue(params);
    this.startYear = this.date.value;
    picker.close();
    console.log(this.date.value);
  }
  endYearSelected(params, picker) {
    console.log(params);
    this.date.setValue(params);
    this.endYear = this.date.value;
    picker.close();
  }
  ngOnInit(): void {
    if (this.input) {
      this.data = JSON.parse(JSON.stringify(this.input));
      this.startYear = this.data.Start_Date + '-01-01T18:30:00.000Z';
      this.endYear = this.data.End_Date + '-01-01T18:30:00.000Z';
      this.default = {
        qualificationLevel: 2,
        degree: 2,
        branch: 0,
        classObtained: 3
      };
    }
    else {

    }
    console.log(this.data);
  }
  onSubmit() {
    const StartDate = new Date(this.startYear);
    const EndDate = new Date(this.endYear);
    console.log(StartDate.getFullYear());

    this.data.Start_Date = StartDate.getFullYear();
    this.data.End_Date = EndDate.getFullYear();
    this.dialogRef.close(this.data);
  }

}
