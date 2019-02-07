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
  isAdmin: boolean;
  private _url = 'http://localhost:8000/users';
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
    const dataUser: any = {
      email,
      pass
    };

    this.http.post(this._url, dataUser);
    const found = this.users.find(function(element) {
      return element.email === email && element.password === pass;
    });
    return found === undefined ? false : true;
  }

  addUser(password, firstname, lastname, sexe, email) {
    const urlAddUser = 'http://localhost:8000/register';
    const userService: User = {
      id : 0,
      username : email,
  roles: ['ROLE_USER'],
  password,
  salt: null,
  firstname,
  lastname,
  sexe,
  email,
    };
    console.log(userService);
    this.http.post<User>(urlAddUser, {
      'id' : 0,
        'username' : email,
        'roles': ['ROLE_USER'],
        'password': password,
        'salt': 'null',
        'firstname': firstname,
        'lastname': lastname,
        'sexe': sexe,
        'email': email
      }).subscribe();

    const found = this.users.find(function(element) {
      return element.email === userService.email;
    });
    if (found === undefined) {
      this.users.push(userService);
      return 1;
    } else {
      return 0;
    }
  }

  deleteUser(user) {
    const id = user.id;
    alert(id);
    const url = `${'http://localhost:8000/deleteuser'}/${id}`;
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.http.delete<User>(url).subscribe();
  }

  getUserByEmail(email: string) {
    const found = this.users.find(function(element) {
      return element.email === email;
    });
    return found;
  }
getRole(email) {
  const user = this.getUserByEmail(email);
  console.log(this.users);
  return user.roles;
}
}
