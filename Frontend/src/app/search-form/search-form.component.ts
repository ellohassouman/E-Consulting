import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperIntl} from '@angular/material/stepper';
import { MatStepper } from '@angular/material/stepper';
import { TypeDocumentModel } from '../Models/type-document-model.model';
import { RequesterService } from '../requester.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [{provide: CdkStepper}],

})
export class SearchFormComponent implements OnInit {


  constructor(
    private FormBuilder: FormBuilder,
    private RequesterService : RequesterService
    ) {}

  optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];


  ExtraitFormGroup !: FormGroup
  PereFormGroup !: FormGroup
  MereFormGroup !: FormGroup
  DemandeurFormGroup !: FormGroup
  Result : TypeDocumentModel[] = []
  StyleInput = {'background-color' : '#ffefef'}



  ngOnInit(): void {

    this.InitFormGroup()

  }

  InitFormGroup()
  {
    this.DemandeurFormGroup = this.FormBuilder.group({
      NomDemandeur: ['', Validators.required],
    });

    this.ExtraitFormGroup = this.FormBuilder.group({
      NumeroExtrait: ['', Validators.required],
    });

    this.PereFormGroup = this.FormBuilder.group({
      NumeroPere: ['', Validators.required],
    });

    this.MereFormGroup = this.FormBuilder.group({
      NumeroMere: ['', Validators.required],
    });

  }



  goBack(stepper: MatStepper){
      stepper.previous();
  }

  async goForward(stepper: MatStepper){

    if(stepper.selectedIndex!=0)
    {
      if(stepper.selectedIndex==1 && this.ExtraitFormGroup.valid)
      {
        await this.ActionByStepperIndex(stepper.selectedIndex) == true ? stepper.next() : this.RequesterService.ShowSweetAlertInfo('Aucun résultat',"Aucun résultat trouvé")
      }

      return
    }
    stepper.next()
  }


  async ActionByStepperIndex(selectedIndex : number)
  {
    var response = false
    switch(selectedIndex)
    {
      case 1 :
      {
        await this.RequesterService.AsyncGetResponseLocal('../../assets/Json/Document.json',true)
        this.Result = this.RequesterService.response
        this.Result = this.Result.filter(x => x.TypeDocumentId == 1)
        this.Result.length>0 ? response= true : response=false

        console.log(this.Result)
        response =true
      }
      break;

      default : response= true ;
    }

    return response


  }




}
