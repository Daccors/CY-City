import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

export interface UserInfo {
  email: string;
  pseudo: string;
  name: string;
  lastName: string;
  birthdate: Date;
  gender: string;
}

//BACK-END
/* içi, avec son token, l'utilisateur va faire une requête a la BDD pour avoir ses infos*/
var DATA: UserInfo = { email: '', pseudo: '', name: '', lastName: '', birthdate: new Date(2025, 26, 3), gender: 'Homme' }
@Component({
  selector: 'app-my-account',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    MatTooltip,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatIcon,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
  imageSrc: string | ArrayBuffer | null = null;
  isDisabled = true;
  DataEditing = {name : false, lastName: false, email: false, birthdate:false, gender:false, pseudo:false}
  ngOnInit() {
    //BACK-END
    /* Requête pour aller chercher les données utilisateurs et les assignées*/

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner un fichier image.');
      }
    }
  }

  sexe: String = '';

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required])
  readonly confirmPassword = new FormControl('', [Validators.required])

  errorMessage = signal('');
  errorMessagePassword = signal('');
  errorMessageConfirmPassword = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());

    merge(this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageConfirmPassword());
  }

  public passwordMatchValidator() {
    if (this.password == this.confirmPassword) {
      return (false);
    }
    return null;
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('Mot de passe obligatoire')
    } else {
      this.errorMessagePassword.set('');
    }
  }

  updateErrorMessageConfirmPassword() {
    if (this.confirmPassword.hasError('notMatched')) {
      this.errorMessageConfirmPassword.set('Les deux mots de passe sont différents')
    } else {
      this.errorMessageConfirmPassword.set('');
    }
  }
}
