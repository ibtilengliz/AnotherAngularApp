import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthService} from './services/auth.service';
import {ArticleService} from './services/article.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { ArticleComponent } from './article/article.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SingleArticleComponent } from './single-article/single-article.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InscriptionComponent } from './inscription/inscription.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [


  { path : 'articles', canActivate: [AuthGuard], component: ArticleViewComponent },
  { path : 'auth', component: AuthComponent},
  { path : '', canActivate: [AuthGuard], component: ArticleViewComponent},
  { path : 'articles/:id',  canActivate: [AuthGuard], component: SingleArticleComponent },
  { path : 'addArticle', canActivate: [AuthGuard], component: AddArticleComponent},
  { path : 'articles/edit/:id', canActivate: [AuthGuard], component:  EditArticleComponent},
  { path: 'inscription' , component: InscriptionComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HeaderComponent,
    ArticleViewComponent,
    AuthComponent,
    SingleArticleComponent,
    FourOhFourComponent,
    AddArticleComponent,
    PostsListComponent,
    EditArticleComponent,
    InscriptionComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
     RouterModule.forRoot(appRoutes),
     NgbModule.forRoot(),
     HttpClientModule

    ],
  providers: [AuthService, AuthGuard, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
