import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../user';
import { Auth } from '../auth';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = true;
  isAuth = false;
  public currentUser: User ;
  private url = 'http://localhost:8000/login';

  constructor(private userService: UsersService, private http: HttpClient, private router: Router) {
  }

  signIn(email, password) {
  const role = this.userService.getRole(email)[0];
  this.currentUser  = this.userService.getUserByEmail(email);
if (role !== 'ROLE_USER') {
  this.isAdmin = true;
} else {
  this.isAdmin = false ;
}
  return this.http.post<Auth>(this.url, {
      'username': email,
      'password': password
    });
  }


  signOut() {
this.isAuth = false;

  }
  getIsAdmin() {
    return this.isAdmin;
  }

}
