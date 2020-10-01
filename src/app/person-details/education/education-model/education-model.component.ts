import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
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
export class EducationModelComponent implements OnInit, AfterViewInit {
  date = new FormControl(moment());
  data = {
    institution : '',
    university: '',
    startYear: '',
    endYear: '',
    thesisTitle: '',
    specialization: '',
    research: '',
  };
  constructor(@Inject(MAT_DIALOG_DATA) public input: any) { }
  startYear;
  endYear;
  ngAfterViewInit() {

  }
  startYearSelected(params, picker) {
    console.log(params);
    this.date.setValue(params);
    this.startYear = this.date.value;
    picker.close();
  }
  endYearSelected(params, picker) {
    console.log(params);
    this.date.setValue(params);
    this.endYear = this.date.value;
    picker.close();
  }
  ngOnInit(): void {
    console.log(this.data);
    if (this.input) {
      this.data = this.input;
      this.startYear = this.data.startYear + '-01-01T18:30:00.000Z';
      this.endYear = this.data.endYear + '-01-01T18:30:00.000Z';

    }
  }

}
