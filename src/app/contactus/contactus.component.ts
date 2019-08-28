import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactusService } from '../services/contactus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  emailSent: boolean;
  mobileValidator = new RegExp("(?:(?:\\+|0{0,2})91(\\s*[\\- ]\\s*)?|[0 ]?)?[789]\\d{9}|(\\d[ -]?){10}\\d", "g");

  constructor(
    private service: ContactusService,
    private router: Router
  ) { }

  contactUsForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required,Validators.email]),
    mobileNumber : new FormControl('', [Validators.required, Validators.pattern(this.mobileValidator)]),
    city : new FormControl('', [Validators.required]),
    message : new FormControl('', [Validators.required]),
    recieveCopy : new FormControl(false)
  })

  ngOnInit() {
  }

  onSubmit() {
    this.service.sendEmail(this.contactUsForm.value)
        .subscribe(res => {
          this.contactUsForm.reset();
          this.emailSent = true;
        },
          error => {
           console.log("TCL: ContactusComponent -> onSubmit -> error", error);
          }
        );
  }

  resetForm() {
    this.emailSent = false;
    let nameField = document.querySelector('#name') as any; 
    nameField.focus();
  }

  get formControls() {
    return this.contactUsForm.controls;
  }

}
