import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit, OnDestroy {
  titre: string;
  contenu: string;
  id: number;
  articleSubscription: Subscription;
  articles: any[];
  articleS: ArticleService;
  constructor(private router: Router, private articleService: ArticleService, private route: ActivatedRoute) { }
  // il ya une utilisation directe de l'array
  ngOnInit() {
    this.articleSubscription = this.articleService.articlesSubject.subscribe(
      (articles: any[]) => {
        this.articles = articles;
      }
    );
  }

  onPost(form: NgForm) {
    this.titre = form.value['titre'];
    this.contenu = form.value['contenu'];
    const id = this.articleService.addArticle(this.titre, this.contenu);
    this.router.navigate(['articles', id]);
  }
  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
  }

}
