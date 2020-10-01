import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonDetailsService } from '../person-details.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss', '../person-details.component.scss']
})
export class PersonComponent implements OnInit {
  prefix = ['Mr.', 'Mrs.', 'Dr.', 'Ms.'];
  community = ['BACKWARD COMMUNITY', 'SCHEDULED TRIBE',
                'SCHEDULED CASTE', 'MOST BACKWARD COMMUNITY', 'OTHER COMMUNITY'];
  caste = ['BACKWARD COMMUNITY', 'SCHEDULED TRIBE',
            'SCHEDULED CASTE', 'MOST BACKWARD COMMUNITY', 'OTHER COMMUNITY'];
  maritalStatus = ['Single', 'Married'];
  isDisabled = true;
  person = {
    Aadhar_Card: 123412341234,
    Address_Line1: '12/15, 21st Street',
    Address_Line2: 'Nanganallur',
    Address_Line3: 'Chennai',
    Address_Line4: '600061',
    Alias_Name: 'Dhana',
    Caste: '308 Nagaram',
    Community_Ref: 1,
    DOB: '1989-06-05T18:30:00.000Z',
    First_Name: 'Dhanalakshmi',
    Gender_Ref: 2,
    Intercom_Number: '123',
    Last_Name: 'Sangili Sabapathy',
    Marital_Status_Ref: 2,
    PAN_Card: 'pancardDet',
    Passport_Number: '123456789',
    Person_ID: 709485,
    Photo: null,
    Prefix_Ref: 1,
    Primary_ContactNumber: 9985596879,
    Primary_MailID: 'dhanalaxmibtech@gmail.com',
    Room_Num: '123',
    Secondary_ContactNumber: '8896857685',
    Secondary_MailID: 'secondary@gmail.com'
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public personDetailsService: PersonDetailsService, private http: HttpClient) { }

  ngOnInit(): void {
    //this.http.get('http://localhost:3000/getposts').subscribe((personData) => {
    //this.person = personData[0];
    console.log(this.person);
 // });
}
onEdit() {
  this.isDisabled = false;
}
onSubmit() {
  this.isDisabled = true;
}
onNavigate(url) {
  this.router.navigateByUrl('/person-details/' + url);

}


}
