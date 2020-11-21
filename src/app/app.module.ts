import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { PersonDetailsComponent } from './person-details/person-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import { PersonComponent } from './person-details/person/person.component';
import { PersonDetailsRoutingModule } from './person-details/person-details-routing.module';
import { EducationComponent } from './person-details/education/education.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { EducationModelComponent } from './person-details/education/education-model/education-model.component';
import { GraphQLModule } from './graphql.module';
import { PersonModelComponent } from './person-details/person/person-model/person-model.component';
import { PublicationComponent } from './person-details/publication/publication.component';
import { PublicationModelComponent } from './person-details/publication/publication-model/publication-model.component';
import { AlertboxComponent } from './alertbox/alertbox.component';
import { FilterPipe } from './person-details/filter.pipe';
import { ExperienceComponent } from './person-details/experience/experience.component';
import { ExperienceModelComponent } from './person-details/experience/experience-model/experience-model.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonDetailsComponent,
    NavComponent,
    PersonComponent,
    EducationComponent,
    EducationModelComponent,
    PersonModelComponent,
    PublicationComponent,
    PublicationModelComponent,
    AlertboxComponent,
    FilterPipe,
    ExperienceComponent,
    ExperienceModelComponent
  ],
  entryComponents: [EducationModelComponent, PersonModelComponent, PublicationModelComponent, AlertboxComponent, ExperienceModelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    PersonDetailsRoutingModule,
    MatDialogModule,
    MatDividerModule,
    GraphQLModule

  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

