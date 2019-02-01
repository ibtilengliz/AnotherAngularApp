import { Component, OnInit } from '@angular/core';
import{UsersService} from '../services/users.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  showMessage=false;
  error: string;
  constructor(private usersService:UsersService,private router:Router) { }

  ngOnInit() {
  
  }
onInscription(form:NgForm){
  
  let firstname=form.value['firstname'];
  let lastname=form.value['lastname'];
  let email=form.value['email'];

  let password=form.value['password'];

  let confirmPassword=form.value['confirmPassword'];
  if (form.value['password']!==form.value['confirmPassword']){
this.showMessage=true;  }
  let sexe=form.value['sexe'];
  let msg: number = this.usersService.addUser(firstname,lastname,email,password,confirmPassword,sexe);
  if (msg === 0) {// ken el user mawjoud deja el addUser traja3 0
    this.router.navigate(['auth']);
  } else {// khater melouel e tableau vide ijii rahou oui bilehi att
    this.error = undefined;
    this.router.navigate(['articles']);
  }
}

}
