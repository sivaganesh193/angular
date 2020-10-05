import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {
  Person_ID = 123;
  constructor() { }
  getPersonID() {
    return this.Person_ID;
  }
}
