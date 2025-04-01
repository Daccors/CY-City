import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { InformationsControlerService } from '../../services/laravel-api/informations-controler.service';
import { localisation } from '../../shared/InstancesInterfaces';
import { merge } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-location-dialog',
  imports: [
    MatDialogActions,
    MatButtonModule,
    MatIcon,
    MatDialogContent,
    MatFormFieldModule,
    MatInput,
    MatDialogTitle,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-location-dialog.component.html',
  styleUrl: './add-location-dialog.component.scss'
})
export class AddLocationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddLocationDialogComponent>);
  private _snackbar = inject(MatSnackBar);
  duration = 3;

  LocalisationAdd = inject(InformationsControlerService);

  Longitude: number = 0;
  Latitude: number = 0;

  readonly acceptedType = new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180), Validators.pattern(/^(-?(?:180(?:\.0{1,8})?|1[0-7]\d(?:\.\d{1,8})?|[1-9]?\d(?:\.\d{1,8})?))$/)
  ]);

  errorMessage = signal('');

  constructor() {
    merge(this.acceptedType.statusChanges, this.acceptedType.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessage()
      });
  }

  updateErrorMessage() {
    if (this.acceptedType.hasError('required')) {
      this.errorMessage.set('Vous devez entrer une valeur !');
    } else if (this.acceptedType.hasError('min') || this.acceptedType.hasError('max')) {
      this.errorMessage.set('Entrez une valeur dans la plage [-180.0, 180.0]');
    } else if (this.acceptedType.hasError('pattern')) {
      this.errorMessage.set('Le paterne est invalide !');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    const newLocalisation: localisation = {
      id: this.LocalisationAdd.getFirstAvailableIndex('localisation'),
      longitude: this.Longitude,
      latitude: this.Latitude,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.LocalisationAdd.addObject('localisation', newLocalisation).subscribe((response) => {
      console.log('Localisation added:', response);
    });
    this.dialogRef.close();
    this.openSnackBar(this.LocalisationAdd.getFirstAvailableIndex('localisation'));
  }

  openSnackBar(localisationID: number) {
    this._snackbar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.duration * 1000,
      data: {
        localisationID
      }
    });
  }
}


@Component({
  selector: 'snack-bar-annotated-component',
  template: `<span matSnackBarLabel>
  Localisation ajouter avec l'ID : {{ data.localisationID }}
</span>
<span matSnackBarActions>
  <button mat-button matSnackBarAction (click)="snackBarRef.dismissWithAction()">Ok</button>
</span>

`,
  styles: `
    :host {
      display: flex;
    }
  `,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);

}