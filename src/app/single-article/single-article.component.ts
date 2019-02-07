import { AuthService } from './../services/auth.service';
import { Commentaires } from './../commentaires';
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
  commentaires: Commentaires[];
  editCommentaires: Array<boolean>;
    toEdit = false;
  url = 'http://localhost:4200/assets/articles.json';

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const article = this.articleService.getArticleById(+id);
    this.titre = article.title;
    this.contenu = article.body;
    this.commentaires = article.comments;
    this.editCommentaires = new Array<boolean>(this.commentaires.length);
  }
  onComment(form: NgForm) {
    const articlePresent = this.articleService.getArticleById(
      +this.route.snapshot.params['id']
    );
    alert(+this.route.snapshot.params['id']);
   /* const url = `${'http://localhost:8000/commenter'}/${+this.route.snapshot.params['id']}`;
     const thisComment = {
      author: this.authService.currentUser.username,
      content: form.value['contenuComm']
    };*/
    this.http.post<Commentaires>(`${'http://localhost:8000/commenter'}/${+this.route.snapshot.params['id']}`, {
      'author': 'user',
      'content': form.value['contenuComm']
    }).subscribe( data  => {
      console.log('POST Request is successful ', data);
      },
      error  => {
      console.log('Rrror', error);
      }
);

this.articleService.updateArticle(articlePresent.id, articlePresent.title, articlePresent.body);
   /* articlePresent.comments.push(thisComment);
    this.articleService.updateArticle(articlePresent.id, articlePresent.title, articlePresent.body);
    this.commentaires.push(thisComment);
alert(thisComment);
*/
  }
  onDeleteComment(commentaire) {
    const articlePresent = this.articleService.getArticleById(
      +this.route.snapshot.params['id']
    );
    const index = articlePresent.comments.indexOf(commentaire);
    articlePresent.comments.splice(index, 1);
    this.http.put(this.url, articlePresent);
  }
  onEditComment(commentaire, i) {
    this.editCommentaires[i] = !this.editCommentaires[i];
    this.http.put(this.url, commentaire);
  }
}
