import { Component, inject, input, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { isObjectLiteralExpression } from 'typescript';


@Component({
  selector: 'app-object-card',
  imports: [
    MatCardModule
  ],
  templateUrl: './object-card.component.html',
  styleUrl: './object-card.component.scss'
})
export class ObjectCardComponent {
  @Input() object: any;
}
