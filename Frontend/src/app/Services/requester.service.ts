import { Injectable } from '@angular/core';
import { ActivatedRoute, Router,ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import Swal from 'sweetalert2';
// import 'rxjs/add/observable/of';
import { of } from 'rxjs';
// import { SpinnerService } from './spinner.service';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { RouteModel } from '../Models/route-model.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

   // RouteBase: string='http://127.0.0.1:8000/api/';
  // RouteBase: string='https://localhost:44346/api/';
  // RouteBase: string='http://majiid-group.com/backend/public/api/';
  RouteBase!: string; //=Configuration.RouteBaseAsp;
  response! : any;
  isOk: number=0;
  LinkDocument : string=""
  CurrentLink: string="";




  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ActivatedRoute : ActivatedRoute,
    private NgxSpinnerService : NgxSpinnerService,
    private FormBuilder : FormBuilder,
)
{
  router.events.subscribe((event) => {


    if (event instanceof NavigationEnd) {
        if(window.location.protocol=='http:')
        {
          if(!window.location.href.includes('localhost'))
          {
            Swal.fire(
              'Information',
              'Vous serrez redirigé vers une connexion sécurisée',
              'info'
            ).then(async (result) => {
              if (result.isConfirmed) {
                window.location.href=window.location.href.replace('http','https');
              }
            })
          }
        }
    }
});

}


async GetConfig()
  {
    let url="../../assets/Configuration.json"
    await this.httpClient.get<RouteModel>(url).toPromise().then(
      data => {
        if(window.location.href.includes('localhost'))
        {
          this.RouteBase=data.RouteBaseLarvelLocal;
        }
        else
        {
          if(window.location.protocol=='http:')
          {
            this.RouteBase=data.RouteBaseApiHttp;
          }
          else
          {
            this.RouteBase=data.RouteBaseApiHttps;
          }
        }






      }
    )

  }

  private async Get(target : string)
    {
      await this.GetConfig()
      return this.httpClient
      .get<any[]>(this.RouteBase+target)
      .pipe(
        map(response =>  response),
        catchError(errorResponse => this.handleError(this.ActivatedRoute.snapshot, errorResponse),
        )
      )

    }

    private async GetLocal(target : string)
    {
      await this.GetConfig()
      return this.httpClient
      .get<any[]>(target)
      .pipe(
        map(response =>  response),
        catchError(errorResponse => this.handleError(this.ActivatedRoute.snapshot, errorResponse),
        )
      )

    }


    private async Put(target : string, data : object)
    {
      await this.GetConfig()
      return this.httpClient
      .put(this.RouteBase+target,data)
      .pipe(
        map(response => response),
        catchError(errorResponse => this.handleError(this.ActivatedRoute.snapshot, errorResponse),
        )
      )

    }


    private async Post(target : string, data : object)
    {
      await this.GetConfig()
      return this.httpClient
      .post(this.RouteBase+target,data)
      .pipe(
        map(response => response),
        catchError(errorResponse => this.handleError(this.ActivatedRoute.snapshot, errorResponse),
        )
      )

    }

    private async PostLocal(target : string, data : object)
    {
      await this.GetConfig()
      return this.httpClient
      .post(target,data)
      .pipe(
        map(response => response),
        catchError(errorResponse => this.handleError(this.ActivatedRoute.snapshot, errorResponse),
        )
      )

    }


  private Subscriber(Observable : Observable<any>,target: any)
  {
    return Observable.toPromise().then(
      (response) => {

        console.log(new UpperCasePipe().transform(target))
        console.log(response);

        if(response!=null)
        {
          this.response=response;
        }
        else
        {
          this.response=null
        }


      }
    ).catch(
      (error) =>
      {
        console.log("Promise rejected with error")
        console.log(error)
      }
    )

  }



  async AsyncGetResponse(targetapi : string)
  {
    await this.Subscriber(await this.Get(targetapi),targetapi)
  }

  async AsyncGetResponseLocal(targetapi : string,ShowLoader : boolean=false)
  {
    Swal.close()
    if(ShowLoader)
    {
      this.ShowLoader()
    }
    await this.Subscriber(await this.GetLocal(targetapi),targetapi)
    Swal.close()
  }


  async AsyncPutResponse(targetapi : string, data : any)
  {
    await this.Subscriber(await this.Put(targetapi, data),targetapi)
  }


  async AsyncPostResponseLocal(targetapi : string, data : any)
  {
    await this.Subscriber(await this.PostLocal(targetapi, data),targetapi)
  }


  async AsyncPostResponse(targetapi : string, data : any,ShowLoader : boolean=false,AutoCloseLoader : boolean=false, ShowSucessmessage : boolean=true,message : string="")
  {
    Swal.close()
    if(ShowLoader)
    {
      this.ShowLoader()
    }
    console.log(data)
    this.isOk=0;
    this.response=null;
    await this.Subscriber(await this.PostLocal(targetapi, data),targetapi)
    this.response ? this.isOk=1 : this.isOk=0

    if(this.isOk)
    {
      if(ShowSucessmessage)
      {
          Swal.fire(
            'Succès!',
            message,
            'success'
          ).then(async (result) => {
            if (result.isConfirmed) {
              // this.MakeAuth(true)
            }
          })
      }

      if(AutoCloseLoader)
      {
        Swal.close()
      }
    }

  }



  async AsyncGetResponseWithJSON(targetapi : string, data : any,ShowLoader : boolean=false,AutoCloseLoader : boolean=false,message='')
  {
    Swal.close
    if(ShowLoader)
    {
      this.ShowLoader()
    }
    console.log(data)
    await this.Subscriber(await this.Post(targetapi, data),targetapi)
    this.response!=null ? this.isOk=1 : this.isOk=0


    if(AutoCloseLoader)
    {
      Swal.close()
    }

      if(message!='')
      {
          Swal.fire(
            'Succès!',
            message,
            'success'
          ).then(async (result) => {
            if (result.isConfirmed) {
              // this.MakeAuth(true)
            }
          })
      }


  }

  showspinner()
  {
    this.NgxSpinnerService.show();
  }

  hidespinner(timeout : number=0)
  {
    console.log('Timeout '+timeout)
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.NgxSpinnerService.hide();
    }, timeout);
  }




    handleError(route: ActivatedRouteSnapshot, errorResponse: HttpErrorResponse) {
      this.hidespinner(0)
      function shwomessage()
      {
        Swal.fire(
          // errorResponse.name+' '+errorResponse.statusText,
          errorResponse.name+' '+errorResponse.status+' '+errorResponse.statusText,
          errorResponse.error==undefined ? errorResponse.message :errorResponse.error.message+'<br>'+errorResponse.url ,
          'error'
        )
        console.error(errorResponse);
      }
      switch (errorResponse.status) {
        case 404: {
          // this.router.navigate(['/not-found']);
          shwomessage()
          return of(null);
        }
        case 401: {
          const returnURL: string = '/' + route.url.map(segment => segment.path).join('/');
          this.router.navigate(['/login'], { queryParams: { returnURL: returnURL }});
          shwomessage()
          return of(null);
        }
        case 403: {
          this.router.navigate(['/unauthorized']);
          shwomessage()
          return of(null);
        }
        default: {
          shwomessage()
          // this.router.navigate(['/error']);
          return of(null);
        }
      }
    }

    ShowSweetAlertInfo(titles='',message='')
    {
      Swal.fire(
        {
          title : titles,
          text : message,
          icon : 'info'
        }
      )
    }





    ShowLoader()
    {
      Swal.fire({
        icon : 'info',
        // title: 'Succès',
        html: 'Opération en cours veuillez patienter ...',
        // timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }

    GetCurrentRoute()
    {
      this.CurrentLink =this.router.url
      return this.CurrentLink
    }


}
