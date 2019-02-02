import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = true;
  isAuth = false;

  public currentUser: User;

  constructor(private userService: UsersService) {}

  signIn(email, password) {
    return new Promise(
      (resolve, reject) => {
        if (this.userService.checkUser(email, password)) {
          this.currentUser = this.userService.getUserByEmail(email);
          this.isAuth = true;
          resolve(true);
        } else {
          this.currentUser = undefined;
          reject(new Error('erreur'));
        }
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
  getIsAdmin() {
    return this.isAdmin;
  }
}
