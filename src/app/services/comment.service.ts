import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  contenuComm:string;
 
  commentaires = [
    {
     id:1,
      contenuComm: 'ébla bala bl abla '
    },
    {
      id:2,
       contenuComm: 'ébla bala bl abla '
     },
     {
      id:3,
       contenuComm: 'ébla bala bl abla '
     }
  ];
  constructor() { }
    //les methodes qui concernent un article sont ici 
    getCommentById(id: number) {
      const commentaire = this.commentaires.find(
        (s) => {
          return s.id === id;
        }
      );
      return commentaire;
  }
 
  addComment(contenuComm:string){
    const commentService = {
     id: 0,
     contenuComm: ''
   };
   commentService.contenuComm = contenuComm;
   commentService.id = this.commentaires[(this.commentaires.length - 1)].id + 1;
   this.commentaires.push(commentService);
   
  }
  getCommentaires() {
    return this.commentaires;
  }
}
