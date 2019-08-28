import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URL='https://us-central1-email-angular-cloud-function.cloudfunctions.net/contactUs';
@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(
    private http: HttpClient
  ) { }
  
  sendEmail(details) {
    return this.http.post(URL,details);
  }
}
