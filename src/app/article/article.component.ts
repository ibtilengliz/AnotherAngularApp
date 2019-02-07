import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() articleTitre: string;
  @Input() articleContenu: string;
  @Input() index: number;
  @Input() id: number;
  isAdmin: boolean;
  lastUpdate = new Date();
  /// ici il y a pas d'utilisation directe de l'array articles !

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
    public articleService: ArticleService) { }
  onRedirectToEdit(id) {
    this.router.navigate(['articles/edit', id]);
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
  }

  onDelete() {
    this.articleService.deleteArticle(this.id);
  }

  setLastUpdate() {
    this.lastUpdate = new Date();
  }
}
