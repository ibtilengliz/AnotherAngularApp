import { Commentaires } from './../commentaires';
import { Article } from './../article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesSubject = new Subject<any[]>();
  private getUrl = 'http://localhost:8000/';
   editUrl = 'http://localhost:8000/edit';

  comments: Array<Commentaires>;
  articles: Array<Article>;

   constructor(private http: HttpClient) {
    this.http.get<Article[]>('http://localhost:8000/').subscribe(articles => {
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

  addArticle(title: string, body: string) {
    const articleService = {
      id: 0,
      title,
      body,
      comments: []
    };
    const  url = 'http://localhost:8000/new';
    const ids = this.articles.map(element => element.id);
    const maxValue = Math.max(...ids);
    articleService.id = maxValue < 0 ? 0 : maxValue + 1;
    this.articles.push(articleService);
    this.http.post<Article>(url,  articleService).subscribe();
    return articleService.id;
  }
  updateArticle( id: number, title: string, body: string) {
    const url = `${this.editUrl}/${id}`;
    const element = this.articles.find(x => x.id === id);
    const index = this.articles.indexOf(element);
    alert(index);
    this.http.put<Article>( `${'http://localhost:8000/edit'}/${id}`,
    {
      'id': id,
      'title': title,
      'body': body,
      'comments': this.articles[index].comments
    } ).subscribe(

      data  => {

      console.log('PUT Request is successful ', data);
      this.articles[index] = {
        'id': id,
        'title': title,
        'body': body,
        'comments': this.articles[index].comments

      };
      },

      error  => {

      console.log('Rrror', error);

      }

      );
  }
  deleteArticle(id: number) {
   const deleteUrl = 'http://localhost:8000/delete';
    const url = `${deleteUrl}/${id}`;
    this.http.delete(url).subscribe();
    const test = this.articles.indexOf(this.getArticleById(id));
    this.articles.splice(test, 1);
  }

  getArticles() {
    return this.articles;
  }
}
