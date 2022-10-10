import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatStepperIntl} from '@angular/material/stepper';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],

})
export class SearchFormComponent implements OnInit {

  optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private _matStepperIntl: MatStepperIntl) {}


  ngOnInit(): void {
  }

}
