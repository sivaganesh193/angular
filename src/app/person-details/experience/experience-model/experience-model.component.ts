import { Component, Inject, OnInit } from '@angular/core';

import {Apollo} from 'apollo-angular';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceModel } from '../experience.model';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-experience-model',
  templateUrl: './experience-model.component.html',
  styleUrls: ['./experience-model.component.scss']
})
export class ExperienceModelComponent implements OnInit {

  experienceForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public input: any, private apollo: Apollo, public dialogRef: MatDialogRef<ExperienceModelComponent>) { }
  getDate(inputDate) {
    var temp = parseFloat(inputDate) / 1000;
    var myDate = new Date(0);
    myDate.setUTCSeconds(temp);
    return myDate;
  }
  ngOnInit(): void {
    this.experienceForm = new FormGroup({
      Experience_ID: new FormControl(this.input.experience != null ? this.input.experience.Experience_ID : ''),
      Person_ID: new FormControl(this.input.experience != null ? this.input.experience.Person_ID : 123),
      Designation_Ref: new FormControl(this.input.experience != null ? this.input.experience.Designation_Ref : ''),
      Organization: new FormControl(this.input.experience != null ? this.input.experience.Organization : ''),
      Department: new FormControl(this.input.experience != null ? this.input.experience.Department : ''),
      Start_Date: new FormControl(this.input.experience != null ? this.getDate(this.input.experience.Start_Date) : ''),
      End_Date: new FormControl(this.input.experience != null ? this.getDate(this.input.experience.End_Date) : ''),
      Emp_Category_Ref: new FormControl(this.input.experience != null ? this.input.experience.Emp_Category_Ref : ''),
      Work_Nature_Ref: new FormControl(this.input.experience != null ? this.input.experience.Work_Nature_Ref : ''),
      Position_Held: new FormControl(this.input.experience != null ? this.input.experience.Position_Held : ''),
    });
  }
  onSubmit() {
    this.dialogRef.close(this.experienceForm.value);
  }

}
