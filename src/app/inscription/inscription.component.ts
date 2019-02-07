import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  showMessage = false;
  error: string;
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }
onInscription(form: NgForm) {
  const firstname = form.value['firstname'];
  const lastname = form.value['lastname'];
  const email = form.value['email'];
  const password = form.value['password'];

  const confirmPassword = form.value['confirmPassword'];
  if (form.value['password'] !== form.value['confirmPassword']) {
this.showMessage = true;  }
  const sexe = form.value['sexe'];
  const msg: number = this.usersService.addUser(password, firstname, lastname, sexe, email);
  if (msg === 0) {// ken el user mawjoud deja el addUser traja3 0
    this.router.navigate(['auth']);
  } else {// khater melouel e tableau vide ijii rahou oui bilehi att
    this.error = undefined;
    this.router.navigate(['articles']);
  }
}

}
