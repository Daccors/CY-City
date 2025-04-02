import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { articles } from '../InstancesInterfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-article-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article: articles;

  photoUrl: string = 'placeholder.png';
  articleUrl: string = '';
  ngOnInit() {
    this.checkIfResourceExists(this.article.photo).then(exists => {
      if (exists) {
        this.photoUrl = this.article.photo;
      }
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
}