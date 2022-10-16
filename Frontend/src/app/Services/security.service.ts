import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RequesterService } from './requester.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  PersonneFormroup! : FormGroup

  constructor(
    private RequesterService : RequesterService,
    private FormBuilder: FormBuilder,
    private Router: Router
    ) { }



  InitFormGroup()
  {
    this.PersonneFormroup = this.FormBuilder.group({
      Email: ['', Validators.required],
      MotDePasse: ['', Validators.required],

    });
  }




  async MakeAuth(message = '')
    {
      if(message!='')
      {
        await this.RequesterService.AsyncGetResponseWithJSON('GetUsersInfoByCredentials',this.PersonneFormroup.value,false,false,message)
      }
      else
      {
        await this.RequesterService.AsyncGetResponseWithJSON('GetUsersInfoByCredentials',this.PersonneFormroup.value,true)
      }

    }

    async CheckCredentials()
    {
      // await this.RequesterService.AsyncGetResponseLocal('../../assets/Json/CheckCredentials.json',this.PersonneFormroup.value)
      await this.RequesterService.AsyncGetResponseLocal('../../assets/Json/CheckCredentials.json')
        if(this.RequesterService.response!=null)
        {
          this.Router.navigateByUrl('/Dashboard')
        }
        else
        {
          Swal.fire(

            "Echec d'authentification ",
            'Login ou mot de passe incorrecte',
            'error'

          ).then(async (result) => {
            if (result.isConfirmed) {
            }
          })
        }

    }

}
