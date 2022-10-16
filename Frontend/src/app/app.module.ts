import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchFormComponent } from './Dashboard/search-form/search-form.component';
import { DemandeComponent } from './Dashboard/demande/demande.component';
import { CompteComponent } from './compte/compte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './Dashboard/Security/login/login.component';
import { MainComponent } from './Dashboard/main/main.component';
registerLocaleData(localeFr, 'fr');






const appRoutes: Routes = [

  { path: 'Login', component: LoginComponent},

      { path: 'Dashboard', component: MainComponent,
      children: [
        { path: '', component: DemandeComponent },
        { path: 'DashboardComponent', component: HomeComponent},
        { path: 'Verify', component: SearchFormComponent},
        { path: 'Demandes', component: DemandeComponent},
        { path: 'Compte', component: CompteComponent},
      ]
      },
      { path: '', redirectTo: 'Login', pathMatch:"prefix" },
  // { path: '', redirectTo: 'Accueil', pathMatch:"prefix" },
  ]




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchFormComponent,
    DemandeComponent,
    CompteComponent,
    LoginComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    PdfViewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ { provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
