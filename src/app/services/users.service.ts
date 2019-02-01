import { Injectable, OnInit } from '@angular/core';
// import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { getMaxListeners } from 'cluster';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _url = 'http://localhost:4200/assets/users.json';
  users: Array<User> = [];
  constructor(private router: Router, private http: HttpClient) {
    this.http.get<User[]>(this._url).subscribe(users => {
      this.users = users;
    });
  }

  isExisted(user, email) {
    return user.email === 'email';
  }

  public getUsers(): Array<User> {
    return this.users;
  }

  checkUser(email: String, pass: string) {
    const found = this.users.find(function(element) {
      return element.email === email && element.password === pass;
    });
    return found === undefined ? false : true;
  }

  addUser(firstname, lastname, email, password, confirmPassword, sexe) {
    const userService: User = {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      sexe
    };
    const found = this.users.find(function(element) {
      return element.email === userService.email;
    });
    if (found === undefined) {
      this.users.push(userService);
      this.http.post<User>('urlPost', userService);
      return 1;
    } else {
      return 0;
    }
  }

  deleteUser(user) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.http.delete<User>('urlPost', user);
  }
}
