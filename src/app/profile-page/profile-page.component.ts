import { Component, inject, signal } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { InformationsControlerService } from '../services/laravel-api/informations-controler.service';
import { users } from '../shared/InstancesInterfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
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
    DatePipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  imageSrc: string | ArrayBuffer | null = 'placeholder.png';
  isDisabled = true;
  DataEditing = { name: false, lastName: false, email: false, birthdate: false, gender: false, pseudo: false }

  user: users;
  id: number = 0;

  canModify : boolean = false;
  private route = inject(ActivatedRoute);
  private userService = inject(InformationsControlerService);

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(localStorage.getItem('user_id'));
    if(localStorage.getItem('user_id') == this.id.toString()){
      this.canModify = true;
    }
    this.userService.getObjectById('users', this.id).subscribe((data) => {
      this.user = data as users;
      this.checkIfResourceExists(this.user.photo).then(exists => {
        if (exists) {
          this.imageSrc = this.user.photo;
        }
      });
    });
  }


  async checkIfResourceExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok; // Renvoie true si le statut est entre 200 et 299
    } catch (error) {
      return false;
    }
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
