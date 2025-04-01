import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectListService } from '../../services/laravel-api/object-list.service';
import { isObjectBindingPattern } from 'typescript';

@Component({
  selector: 'app-modify-object',
  imports: [],
  templateUrl: './modify-object.component.html',
  styleUrl: './modify-object.component.scss'
})
export class ModifyObjectComponent {
  type = '';
  id = -1;
  private objectList = inject(ObjectListService);

  constructor (private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];

    if(this.type == 'a'){
      this.router.navigate(['/']);
    }
  }
}
