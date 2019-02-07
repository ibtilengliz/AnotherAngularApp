import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
    titre: string;
    contenu: string;
    activeClass = 'active';
    isActive = false;
    id: number;
  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) { }
    ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.titre = this.articleService.getArticleById(+this.id).title;
    this.contenu = this.articleService.getArticleById(+this.id).body;
  }
  seeAllPosts() {
    this.router.navigate(['articles']);
    }
  onEdit(form: NgForm) {
    this.titre = form.value['titre'];
    this.contenu = form.value['contenu'];
    this.router.navigate(['articles']);
    this.articleService.updateArticle(+this.id, this.titre, this.contenu );
  }

}
