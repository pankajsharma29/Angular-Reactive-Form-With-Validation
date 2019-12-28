import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reactive Forms';
  submitted = false;
  reactiveForm: FormGroup;
  gender = ['Male', 'Female'];
  forbiddenUserNames = ['Test1', 'Test2'];

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      empData: new FormGroup({
        fullName: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('Male'),
      SecurityQuestion: new FormControl('schoolName'),
      questionAnswer: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.reactiveForm.status === 'VALID') {
      this.submitted = true;
      this.reactiveForm.reset({
        empData: {
          fullName: '',
          email: ''
        },
        gender: 'Male',
        SecurityQuestion: 'schoolName',
        questionAnswer: ''
      });
    }
  }

  // Custom validators
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
        return {nameIsForbidden: true};
    }
    return null;
  }
}
