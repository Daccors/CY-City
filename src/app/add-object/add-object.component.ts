import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface Object {
  name: string;
  num: number;
  type: string;
  button: number
}

/* Liste à construire selon la BDD */
//BACK-END
const ELEMENT_DATA: Object[] = [
  { num: 1, name: 'LAMP001', type: 'lamp', button: 1 },
  { num: 2, name: 'TRASH0001', type: 'trash', button: 2 },
];

@Component({
  selector: 'app-add-object',
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './add-object.component.html',
  styleUrl: './add-object.component.scss'
})
export class AddObjectComponent {
  readonly dialog = inject(MatDialog);
  num = 0;

  displayedColumns: string[] = ['num', 'name', 'type', 'button'];
  dataSource = ELEMENT_DATA;

  DeleteDialog(element : Object) {
    console.log("has been clicked", element);
    this.openDialog(element);
  }
  openDialog(element : Object): void {
    const dialogRef = this.dialog.open(DeleteObjectDialogComponent, {
      data: {
        num: element.num, 
        name : element.name,
        type: element.type
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

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
