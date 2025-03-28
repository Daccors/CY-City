import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AddObjectComponent } from './add-object/add-object.component'
import { AddObjectFormComponent } from './add-object/add-object-form/add-object-form.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { authGuard } from './services/auth.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: '', title: "Menu principal", component: HomeComponent },
    { path: 'add_object', component: AddObjectComponent, canActivate:[authGuard], data:{roles:['admin']} },
    { path: 'search', component: SearchComponent},
    { path: 'sign_in_up', component: SignInUpComponent},
    { path: 'add_object_form', component: AddObjectFormComponent, canActivate:[authGuard], data: {roles:['admin']}},
    { path: 'my-account', component: MyAccountComponent},
    { path: 'Unauthorized', component: UnauthorizedComponent},
    { path: '**', redirectTo: '' },
];