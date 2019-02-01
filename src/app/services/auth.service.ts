import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  isAdmin=true;
  isAuth = false;

  constructor(private userService: UsersService) {}

  signIn(email, password) {
    return new Promise(
      (resolve, reject) => {
        if (this.userService.checkUser(email, password)) {
          this.isAuth = true;
          resolve(true);
        } else {
          reject(new Error('erreur'));
        }
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
  getIsAdmin()
  {
    return this.isAdmin;
  }
}