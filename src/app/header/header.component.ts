import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authStatus: boolean;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {


  }
  estAuthentifie() {
    if (this.authService.isAuth) {
    return true;
    } else {
    return false;
    }
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
