import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import {PublicationModel} from './publication.model';
import { PersonDetailsService } from '../person-details.service';
import {PublicationModelComponent} from './publication-model/publication-model.component';
import { AlertboxComponent } from 'src/app/alertbox/alertbox.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs/operators';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  publications: PublicationModel[];
  pageSlice: PublicationModel[];
  queryRef: QueryRef<PublicationModel[]>;
  publicationType;
  level;
  searchText;
  filterResults;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private apollo: Apollo,  public personDetailsService: PersonDetailsService) { }

  ngOnInit(): void {
    const id = this.personDetailsService.getPersonID();
    const req = gql`
    query person_publications ($data: Person_QueryInput!) {
      person_publications(data: $data) {
      Publication_ID
      Person_ID
      Publication_Type_Ref
      Level_Ref
      Paper_Title
      First_Author
      Second_Author
      Other_Authors
      Journal_Name
      Volume
      Issue
      DOI
      Year_Of_Publish
      Start_Page_No
      End_Page_No
      Publisher
      Impact_Factor
      }
    }
    `;
    this.queryRef = this.apollo
    .watchQuery({
      query: req,
      variables: {
        data: {
          Person_ID: id
        }
      }
    });
    this.queryRef.valueChanges.subscribe((result: any) => {
      console.log(result.data);
      this.publications = result.data.person_publications;
      this.pageSlice = this.publications.slice(0, 2);
      this.filterResults = [...this.publications];
      this.personDetailsService.getDropDown('Publication_Type').subscribe(result => {
        this.publicationType = result;
      });
      this.personDetailsService.getDropDown('Level').subscribe(result => {
        this.level = result;
      });
    });
  }
  filterPublicationType(ref) {
    return this.publicationType.filter(l => l.Ref_Code === ref)[0];
  }
  filterLevel(ref) {
    return this.level.filter(l => l.Ref_Code === ref)[0];
  }
  createDialog() {
    let dialogCreateRef = this.dialog.open(PublicationModelComponent, {data: {
      publicationType: this.publicationType,
      level: this.level
    }});
    dialogCreateRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        const req = gql `
        mutation createPersonPublication($data: Person_PublicationInput!) {
          createPersonPublication(data: $data) {
            Person_ID
          }
        }
        `;
        this.apollo.mutate({
          mutation: req,
          variables: {
            data: {
              Person_ID: result.Person_ID,
              Publication_Type_Ref: result.Publication_Type_Ref,
              Level_Ref: result.Level_Ref,
              Paper_Title: result.Paper_Title,
              First_Author: result.First_Author,
              Second_Author: result.Second_Author,
              Other_Authors: result.Other_Authors,
              Journal_Name: result.Journal_Name,
              Volume: result.Volume,
              Issue: result.Issue,
              DOI: result.DOI,
              Year_Of_Publish: result.Year_Of_Publish,
              Start_Page_No: result.Start_Page_No,
              End_Page_No: result.End_Page_No
            }
          }
        }).subscribe(({data}) => {
          this.queryRef.refetch().then(() => {
            this.paginator.lastPage();
          });

        });
      }
    });
  }
  deleteDialog(id) {
    let dialogDeleteRef = this.dialog.open(AlertboxComponent);
    dialogDeleteRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        const req = gql `
        mutation deletePersonPublication($data: Person_PublicationDeleteInput!) {
          deletePersonPublication(data: $data) {
            Person_ID
          }
        }
        `;
        this.apollo
    .mutate({
      mutation: req,
      variables: {
        data: {
          Publication_ID: id
        }
      }}).subscribe(({ data }) => {
      this.queryRef.refetch();
      this.paginator.firstPage();
    });

      }
    })
  }
  openDialog(id) {
    const publication = this.publications.filter((q) => q.Publication_ID === id);
    let dialogUpdateRef = this.dialog.open(PublicationModelComponent, {data: {
      publicationType: this.publicationType,
      level: this.level,
      publication: publication[0]
    }});
    dialogUpdateRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        const req = gql `
        mutation updatePersonPublication($data: Person_PublicationUpdateInput!) {
          updatePersonPublication(data: $data) {
            Publication_ID
          }
        }
        `;
        this.apollo.mutate({
          mutation: req,
          variables: {
            data: {
              Publication_ID: result.Publication_ID,
              Publication_Type_Ref: result.Publication_Type_Ref,
              Level_Ref: result.Level_Ref,
              Paper_Title: result.Paper_Title,
              First_Author: result.First_Author,
              Second_Author: result.Second_Author,
              Other_Authors: result.Other_Authors,
              Journal_Name: result.Journal_Name,
              Volume: result.Volume,
              Issue: result.Issue,
              DOI: result.DOI,
              Year_Of_Publish: result.Year_Of_Publish,
              Start_Page_No: result.Start_Page_No,
              End_Page_No: result.End_Page_No
            }
          }
        }).subscribe(({data}) => {
          this.queryRef.refetch();
          this.changeHandler();
        });
      }
    });

  }
  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filterResults.length) {
      endIndex = this.filterResults.length;
    }
    this.pageSlice = this.filterResults.slice(startIndex, endIndex);
  }
  changeHandler() {
    this.filterResults = this.transform(this.publications, this.searchText);
    this.pageSlice = this.filterResults.slice(0, 2);
  }
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
          return it.Paper_Title.toLowerCase().includes(searchText);
        });
   }
}