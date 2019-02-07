import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../user';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = true;
  isAuth = false;
data: any;
  public currentUser: User;
  private url = 'http://localhost:8000/login';

  constructor(private userService: UsersService, private http: HttpClient, private router: Router) {
    //  this.isAuth = {isAuth = false};
  }

  signIn(email, password) {
    return this.http.post<Auth>(this.url, {
      'username': email,
      'password': password
    });
  /*  return new Promise(
      (resolve, reject) => {
        if (this.userService.checkUser(email, password)) {

          this.currentUser = this.userService.getUserByEmail(email);
          this.http.get<Auth>(this.url).subscribe(data => {
            this.authJson = data;
          this.isAuth = this.authJson.isAuth;
          });
            resolve(true);
        } else {
          this.currentUser = undefined;
          reject(new Error('erreur'));
        }
      }
    );*/
  }

  signOut() {
this.isAuth = false;

  }
  getIsAdmin() {
    return this.isAdmin;
  }
}
