import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { AuthService} from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  articleService:ArticleService;
 // articleSubscription: Subscription;
  //articles: any[];
  isAuth=false;
  isAdmin=false;
  constructor(articleService: ArticleService,private authService :AuthService,private usersService:UsersService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
    this.articleService = articleService;
    this.usersService=usersService;
  }

ngOnInit() {
this.isAdmin=this.authService.getIsAdmin();

}
onDeleteUser(user){
  this.usersService.deleteUser(user);
}

}