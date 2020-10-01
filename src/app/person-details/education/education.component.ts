import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EducationModelComponent } from './education-model/education-model.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss', '../person-details.component.scss']
})
export class EducationComponent implements OnInit {
  qualifications = [
    {
      qid : '1',
      institution : 'MIT',
      university: 'Anna University',
      startYear: '2010',
      endYear: '2015',
      thesisTitle: 'Thesis ABC',
      specialization: 'Specilization ABC',
      research: 'Research ABC',
    },
    {
      qid : '2',
      institution : 'IIT',
      university: 'IAM University',
      startYear: '2014',
      endYear: '2018',
      thesisTitle: 'Thesis ABC',
      specialization: 'Specilization ABC',
      research: 'Research ABC',
    },
    {
      qid : '3',
      institution : 'MIT',
      university: 'Anna University',
      startYear: '2010',
      endYear: '2015',
      thesisTitle: 'Thesis ABC',
      specialization: 'Specilization ABC',
      research: 'Research ABC',
    }
  ];
  constructor(public dialog: MatDialog) {  }

  ngOnInit(): void {

  }
  openDialog(id) {
    const qualification = this.qualifications.filter((q) => q.qid === id);
    let dialogRef = this.dialog.open(EducationModelComponent, {data: qualification[0]});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  createDialog(){
    let dialogRef = this.dialog.open(EducationModelComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }
}
