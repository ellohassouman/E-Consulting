import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { DemandeComponent } from './demande/demande.component';
import { CompteComponent } from './compte/compte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';







const appRoutes: Routes = [
  { path: 'Accueil', component: HomeComponent},
  { path: 'Verify', component: SearchFormComponent},
  { path: 'Demandes', component: DemandeComponent},
  { path: 'Compte', component: CompteComponent},
  // { path: '', redirectTo: 'Verify', pathMatch:"prefix" },
  { path: '', redirectTo: 'Accueil', pathMatch:"prefix" },
  ]




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchFormComponent,
    DemandeComponent,
    CompteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
