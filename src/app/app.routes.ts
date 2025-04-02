import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { authGuard } from './services/auth.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { SearchComponent } from './search/search.component';
import { ModifyObjectComponent } from './objectControl/modify-object/modify-object.component';
import { AddObjectFormComponent } from './add-object-form/add-object-form.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    { path: '', title: "Menu principal", component: HomeComponent },
    { path: 'search', title: 'Recherche', component: SearchComponent },
    { path: 'sign_in_up', title: 'CY-City identification', component: SignInUpComponent },
    { path: 'add_object', title: 'Ajouter un objet', component: AddObjectFormComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
    { path: 'my-account', title: 'Mon compte', component: MyAccountComponent },
    { path: 'modification/:type/:id', component: ModifyObjectComponent },
    { path: 'modification', redirectTo: '/search' },
    { path: 'test', component: TestComponent },
    { path: 'Unauthorized', title: 'Erreur 401 (Accès refusé)', component: UnauthorizedComponent },
    { path: '**', redirectTo: '' },
];