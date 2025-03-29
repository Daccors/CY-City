import { ChangeDetectionStrategy, Component, inject, HostListener } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ObjectListService } from '../services/laravel-api/object-list.service';
/* Build list from Data Base */

export interface Object {
  name: string;
  num: number;
  type: string;
  button: number
}

//BACK-END
const ELEMENT_DATA: Object[] = [
  { num: 1, name: 'LAMP001', type: 'lamp', button: 1 },
  { num: 2, name: 'TRASH0001', type: 'trash', button: 2 },
];

// snackbar : display informations on the middle-bottom of the screen (display "add to favorite" for example)
@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  template: '<span class= "example-pizza-party" matSnackBarLabel>Pizza party!!!</span>',
  styles: `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  imports: [MatButtonModule, MatSnackBarLabel],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}

//Delete Dialog : opens when 'delete' button is clicked
@Component({
  selector: 'delete-object-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule
  ],
  templateUrl: './delete-object-dialog.component.html',
  styleUrl: './delete-object-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteObjectDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteObjectDialogComponent>);
  readonly data = inject<Object>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    console.log("Confirm pressed for", this.data)
  }
}

// Main component
@Component({
  selector: 'app-add-object',
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule
  ],
  templateUrl: './add-object.component.html',
  styleUrl: './add-object.component.scss'
})
export class AddObjectComponent {
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  num = 0;

  displayedColumns: string[] = ['num', 'name', 'type', 'button'];
  dataSource = ELEMENT_DATA;

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  DeleteDialog(element: Object) {
    console.log("has been clicked", element);
    this.openDialog(element);
  }
  openDialog(element: Object): void {
    const dialogRef = this.dialog.open(DeleteObjectDialogComponent, {
      data: {
        num: element.num,
        name: element.name,
        type: element.type
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}