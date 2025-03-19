import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'créer_un_compte', component: SignUpComponent },
    {path: 'se_connecter', component: SignInComponent},
    { path: '**', redirectTo: '' },
];