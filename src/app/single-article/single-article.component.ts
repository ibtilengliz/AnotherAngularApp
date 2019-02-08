import { Article } from './../article';
import { AuthService } from './../services/auth.service';
import { Commentaires } from './../commentaires';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { headersToString } from 'selenium-webdriver/http';
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
  estAutorise: Array<boolean> ;
  url = 'http://localhost:4200/assets/articles.json';

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private headers: HttpHeaders = new HttpHeaders();
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const article = this.articleService.getArticleById(+id);
    this.titre = article.title;
    this.contenu = article.body;
    this.commentaires = article.comments;
    this.editCommentaires = new Array<boolean>(this.commentaires.length);
    this.estAutorise = new Array<boolean>(this.commentaires.length);

   // this.estAutorise = new Array<boolean>(this.commentaires.length);

  }

  onComment(form: NgForm) {
    const articlePresent = this.articleService.getArticleById(
      +this.route.snapshot.params['id']
    );
    const commentUrl = `${'http://localhost:8000/commenter'}/${+this.route
      .snapshot.params['id']}`;
    this.headers.append('Content-Type', 'application/json');
    this.http
      .post<Commentaires>(
        commentUrl,
        JSON.stringify({
          author: 'user',
          content: form.value['contenuComm']
        }),
        { headers: this.headers }
      )
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
        },
        error => {
          console.log('Rrror', error);
        }
      );
  }
  onDeleteComment(commentaire, i) {
    // il faut pas essayer de supprimer que lorsque je regle le probleme d'ajout de commentaires
    // il y a un probleme au niveau de delete
    if (this.authService.currentUser.username === commentaire.author) {
     // this.estAutorise[i] = true;
      const deleteCommUrl = `${'http://localhost:8000/deletecomment'}/${+commentaire.id}`;
      const articlePresent = this.articleService.getArticleById(
        +this.route.snapshot.params['id']
      );
      const index = articlePresent.comments.indexOf(commentaire);
      articlePresent.comments.splice(index, 1);
      this.http.delete(deleteCommUrl).subscribe(
        data => {
          console.log('POST Request is successful ', data);
        },
        error => {
          console.log('Rrror', error);
        }
      );
    } // this.estAutorise[i] = false;
  }
  onEditComment(commentaire, i) {
    if (this.authService.currentUser.username === commentaire.author) {
      this.editCommentaires[i] = !this.editCommentaires[i];
      this.estAutorise[i] = ! this.estAutorise[i];
      const editCommentUrl = `${'http://localhost:8000/editcomment'}/${+commentaire.id}`;
      this.http.put<Commentaires>(editCommentUrl, commentaire).subscribe(
        data => {
          console.log('PUT Request is successful ', data);
        },
        error => {
          console.log('Rrror', error);
        }
      );
    }
  }
}
