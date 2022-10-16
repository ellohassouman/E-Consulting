import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperIntl} from '@angular/material/stepper';
import { MatStepper } from '@angular/material/stepper';
import { EnumTypeDocument } from '../../Enum/enum-type-document';
import { EnumTypeNationnalite } from '../../Enum/enum-type-nationnalite';
import { TypeDocumentModel } from '../../Models/type-document-model.model';
import { RequesterService } from '../../Services/requester.service';
import GcPdfViewer from '@grapecity/gcpdfviewer';

declare function NiceSelect() : any
declare function GetTypeNationnaliteId() : any


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
  TypeNationnaliteFormGroup !: FormGroup
  Result : TypeDocumentModel[] = []
  StyleInput = {'background-color' : '#ffefef'}
  EnumTypeDocument = EnumTypeDocument
  TypeNationnaliteId : number=1
  EnumTypeNationnalite =EnumTypeNationnalite
  InformationFormGroup! : FormGroup



  ngOnInit(): void {

    this.InitFormGroup()
    NiceSelect()

  }

  InitFormGroup()
  {
    this.TypeNationnaliteFormGroup = this.FormBuilder.group({
      TypeNationnalite: [1, Validators.required],
    });

    this.InformationFormGroup = this.FormBuilder.group({
      NumeroExtrait: ['', Validators.required],
      NumeroPieceParent: ['', Validators.required],
      NumeroJugement: ['', Validators.required],
      NumeroAcquisition: ['', Validators.required],
      NumeroActeMariage: ['', Validators.required],
      NumeroCertificatNationnalite: ['', Validators.required],
      NumeroNonDeclination: ['', Validators.required],
      NomDemandeur: ['', Validators.required],

    });



    // this.DemandeurFormGroup = this.FormBuilder.group({
    //   NomDemandeur: ['', Validators.required],
    // });

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

  CheckValidityField(ObjectId : Number,canEnable=0)
  {
    let retourval : boolean
    switch(ObjectId)
    {
      case 0 :
        {
          if((canEnable))
          {
            this.InformationFormGroup.get("NomDemandeur")?.value!="" ? retourval =true : retourval=false
          }
          else
          {
            retourval = true
          }
        }
        break;

        default : retourval = true;

    }

    return retourval

  }



  goBack(stepper: MatStepper){
      stepper.previous();
  }

  async goForward(stepper: MatStepper){

    this.TypeNationnaliteFormGroup.patchValue(
      {
        TypeNationnalite : GetTypeNationnaliteId()
      })

    this.TypeNationnaliteId= this.TypeNationnaliteFormGroup.get('TypeNationnalite')?.value

    // if(stepper.selectedIndex!=0)
    // {
    //   if(stepper.selectedIndex==1 && this.ExtraitFormGroup.valid)
    //   {
    //     await this.ActionByStepperIndex(stepper.selectedIndex) == true ? stepper.next() : this.RequesterService.ShowSweetAlertInfo('Aucun résultat',"Aucun résultat trouvé")
    //   }

    //   return
    // }
    stepper.next()
  }

  async GetDocument(TypeDocumentId : number)
  {
    await this.ActionByStepperIndex(TypeDocumentId) == true ? null : this.RequesterService.ShowSweetAlertInfo('Aucun résultat',"Aucun résultat trouvé")
  }


  async ActionByStepperIndex(TypeDocumentId : number)
  {
    var response = false
    switch(TypeDocumentId)
    {
      case EnumTypeDocument.ExtraitNaissance :
      {
        await this.RequesterService.AsyncGetResponseLocal('../../assets/Json/ExtraitNaissance.json',true)
        this.Result.push(this.RequesterService.response[0])
        this.Result.length>0 ? response= true : response=false

        console.log(this.Result)
        response =true
      }
      break;

      case EnumTypeDocument.CarteNationnale :
      {
        await this.RequesterService.AsyncGetResponseLocal('../../assets/Json/CarteNationnale.json',true)
        this.Result.push(this.RequesterService.response[0])
        this.Result.length>0 ? response= true : response=false

        console.log(this.Result)
        response =true
      }
      break;

      default : response= true ;
    }

    return response


  }

  ViewDocument(Link : string)
  {
    // this.RequesterService.LinkDocument=Link
    const viewer = new GcPdfViewer("#viewer", {
      workerSrc: "//node_modules/@grapecity/gcpdfviewer/gcpdfviewer.worker.js",
      restoreViewStateOnLoad: false,
    });
    viewer.addDefaultPanels();
    viewer.open(Link);

  }

  // ngAfterViewInit() {
  //   const viewer = new GcPdfViewer("#viewer", {
  //     workerSrc: "//node_modules/@grapecity/gcpdfviewer/gcpdfviewer.worker.js",
  //     restoreViewStateOnLoad: false
  //   });
  //   viewer.addDefaultPanels();
  //   viewer.open("assets/pdf/1.pdf");
  // }




}
