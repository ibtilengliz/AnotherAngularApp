import { Article } from './../article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  titre: string;
  contenu: string;
  articlesSubject = new Subject<any[]>();
  private url = 'http://localhost:4200/assets/articles.json';
  commentaires: Array <any>;
  articles: Array<Article>;
  constructor(private http: HttpClient) {
    this.http.get<Article[]>(this.url).subscribe(articles => {
      this.articles = articles;
    });
  }
  // les methodes qui concernent un article sont ici
  getArticleById(id: number) {
    const found = this.articles.find(element => {
      return element.id === id;
    });
    return found;
  }
  emitArticleSubject() {
    this.articlesSubject.next(this.articles.slice());
  }
  addArticle(titre: string, contenu: string) {
    const articleService = {
      id: 0,
      titre,
      contenu,
      commentaires: []
    };
    const ids = this.articles.map(element => element.id);
    const maxValue = Math.max(...ids);
    articleService.id = maxValue < 0 ? 0 : maxValue + 1;
    this.articles.push(articleService);
    this.emitArticleSubject();
    this.http.post(this.url, articleService);
    return articleService.id;
  }
  getTitle() {
    return this.titre;
    this.emitArticleSubject();
  }
  getContenu() {
    return this.contenu;
    this.emitArticleSubject();
  }
  updateArticle(titre: string, contenu: string, id: number) {
    const articleService = {
      id,
      titre,
      contenu,
      commentaires: []
    };
    this.articles[id] = articleService;
    this.emitArticleSubject();
    this.http.put(this.url, articleService);
    // ajouter dans toutes les methodes du service un appel a la methode d'emission des donnes
  }
  deleteArticle(id: number) {
    const url = `${this.url}/${id}`;
    const test = this.articles.indexOf(this.getArticleById(id));
    this.articles.splice(test, 1);
    this.emitArticleSubject();
    this.http.delete(url);
  }

  getArticles() {
    return this.articles;
  }
}
