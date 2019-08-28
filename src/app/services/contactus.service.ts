import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URL='YOUR_CLOUD_FUNCTION_URL';
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
