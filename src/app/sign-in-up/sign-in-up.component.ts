import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
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
import { HttpErrorResponse } from '@angular/common/http';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface newUser {
  email: string,
  clear_password: string,
  username: string
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('ConfirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

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
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {
  switchSignInSignUp: boolean = false;

  matcher = new MyErrorStateMatcher();
  matcherpsw = new MyErrorStateMatcher();


  postSignUp : boolean = false;
  postLogin : boolean = false;

  register = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ConfirmPassword: new FormControl('', Validators.required),
    acceptConditions: new FormControl(false, Validators.requiredTrue)
  }, { validators: passwordMatchValidator });

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false, []),
  });


  constructor() {
    this.register.get('password')?.valueChanges.subscribe(() => {
      this.register.get('ConfirmPassword')?.updateValueAndValidity();
    });
  }

  authService = inject(AuthService);
  router = inject(Router);

  onLogin(): void {
    // Vérifier la validité des contrôles avant de tenter la connexion
    this.postLogin = true;
    if (this.login?.invalid) {
      return;
    }

    this.authService.login(this.login.get('email').value, this.login.get('password').value, this.login.get('rememberMe').value)
      .subscribe({
        next: () => {
          this.openSnackBar("Connexion réussie");
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.openSnackBar("Échec de la connexion : vérifier vos identifiants.")
        }
      });
  }

  // Inscription
  onRegister(): void {
    if (this.register.valid) {
      this.postSignUp = true;
      let newUser = {
        "username": this.register.value['username'],
        "photo": null,
        "name": this.register.value['FirstName'],
        "surname": this.register.value['LastName'],
        "email": this.register.value['email'],
        "password": this.register.value['password'],
        "gender": null,
        "status": null,
        "birthdate": null,
        "address_id": null
      };
      this.authService.register(newUser).subscribe({
        next: (response) => {
          if (response === true) {
            this.router.navigate(['/']);
            this.openSnackBar("Inscription...")
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 422) {
            const errorMessage = error.error?.message || 'Une erreur est survenue.';
            console.log(errorMessage);
            this.openSnackBar(errorMessage);
            this.postSignUp = false;
          } else {
          }
        }
      });
    }
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(errorMessageBar, {
      duration: 5000,
      data: {
        message: message,
      }
    });
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  template: `
  <span matSnackBarLabel>
    {{ data.message }}
  </span>`,
  styles: `
    :host {
      display: flex;
    }
  `,
  imports: [MatSnackBarLabel],
})
export class errorMessageBar {
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);
}