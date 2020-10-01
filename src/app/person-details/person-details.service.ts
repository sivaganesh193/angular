import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {
private person: any;
  constructor(private http: HttpClient) { }
  getPerson() {}

}
