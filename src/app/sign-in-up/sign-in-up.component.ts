import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher, MatLine } from '@angular/material/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-sign-in-up',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {
  switchSignInSignUp : boolean = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);

  matcher = new MyErrorStateMatcher();
  matcherpsw = new MyErrorStateMatcher();

  LoginObjt: any = {
    mail: '',
    password: ''
  };

  rememberMe: boolean = false;

  checkChanged(event: MatCheckboxChange): void {
    this.rememberMe = event.checked;
  }
  authService = inject(AuthService);
  router = inject(Router);

  onLogin(): void {
    // Vérifier la validité des contrôles avant de tenter la connexion
    console.log(this.rememberMe);
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    //BACK-END

    this.authService.login(this.LoginObjt.mail, this.LoginObjt.password, this.rememberMe)
      .subscribe({
        next: () => {
          // Rediriger après connexion réussie
          console.log("Connecté en tant qu'Admin");
          console.log(this.rememberMe)
          this.router.navigate(['/']);
        },
        error: (err) => {
          // Gérer l'erreur de connexion
          console.error(err);
        }
      });
  }
}
