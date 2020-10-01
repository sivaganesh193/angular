import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PersonDetailsService} from './person-details.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public personDetailsService: PersonDetailsService, private http: HttpClient) {
  }
  ngOnInit(): void {
  }
}
