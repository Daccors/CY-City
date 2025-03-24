import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddObjectComponent } from './add-object/add-object.component'
import { AddObjectFormComponent } from './add-object/add-object-form/add-object-form.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'créer_un_compte', component: SignUpComponent },
    { path: 'se_connecter', component: SignInComponent },
    { path: 'add_object', component: AddObjectComponent, canActivate:[authGuard], data:{roles:['admin']} },
    { path: 'add_object_form', component: AddObjectFormComponent, canActivate:[authGuard], data: {roles:['admin']}},
    { path: 'Unauthorized', component: UnauthorizedComponent},
    { path: '**', redirectTo: '' },
];