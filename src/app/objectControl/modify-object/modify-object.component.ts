import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectListService } from '../../services/laravel-api/object-list.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import * as InstancesInterface from '../../shared/InstancesInterfaces';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modify-object',
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './modify-object.component.html',
  styleUrl: './modify-object.component.scss'
})
export class ModifyObjectComponent {
  
  type: keyof InstancesInterface.ObjectTypes;
  id = -1;
  private objectList = inject(ObjectListService);
  object: InstancesInterface.ObjectTypes[keyof InstancesInterface.ObjectTypes];
  objectKey : any[];
  constructor (private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'] as keyof InstancesInterface.ObjectTypes;
    this.id = this.route.snapshot.params['id'];
    
    this.objectList.getObjectById(this.type, this.id).subscribe(
      (data) => { 
        this.object = data;
        this.objectKey = Object.keys(this.object);
      });
  }
}
