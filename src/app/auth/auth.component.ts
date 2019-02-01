import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
// il ya  pas 
  erreur : string;
  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }
estAuthentifie(){
  if (  this.authService.isAuth)
  return true;
    else return false; 
}
  onSignIn(email, password) {

    this.authService.signIn(email, password).then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.authService.isAuth;
        this.erreur = undefined;
        this.router.navigate(['articles']);

      }, () => {
        console.log('erreur!');
        this.erreur = "Erreur!";
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
