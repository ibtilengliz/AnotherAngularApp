import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {
  titre: string;
  contenu: string;
  commentaires: any[];
   url = 'http://localhost:4200/assets/articles.json';

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const article = this.articleService.getArticleById(+id);
    this.titre = article.titre;
    this.contenu = article.contenu;
    this.commentaires = article.commentaires;
  }
  onComment(form: NgForm) {
    const articlePresent = this.articleService.getArticleById(
      +this.route.snapshot.params['id']
    );
    articlePresent.commentaires.push(form.value['contenuComm']);
    this.http.put(this.url, articlePresent);

  }
  onDeleteComment(commentaire) {
    const articlePresent = this.articleService.getArticleById(
      +this.route.snapshot.params['id']
    );
    const index = articlePresent.commentaires.indexOf(commentaire);
    articlePresent.commentaires.splice(index, 1);
    this.http.put(this.url, articlePresent);
  }
}
