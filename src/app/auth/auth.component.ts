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
  erreur: string;
  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }
estAuthentifie() {
  if (this.authService.isAuth) {
  return true;
  } else { return false; }
}
  onSignIn(email, password) {
    this.authService.signIn(email, password).subscribe((data) => {
      if (data) {
        this.authService.isAuth = true;
        this.authStatus = true;
        this.erreur = undefined;
        this.router.navigate(['/articles']);
      } else {
        this.authService.isAuth = false;
        this.authStatus = false;
        this.erreur = 'Erreur';
      }
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/auth']);
    this.authStatus =  this.authService.isAuth;
    this.erreur = undefined;
  }
  redirectToInscri() {
this.router.navigate(['inscription']);
  }
}
