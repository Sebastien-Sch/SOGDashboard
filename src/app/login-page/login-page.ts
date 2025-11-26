import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/loginService/login-service';

@Component({
  selector: 'app-login-page',
  imports: [NgOptimizedImage, ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})

export class LoginPage {
  logoSrc = "/sog-logo.png";

  constructor(private service: LoginService) {}

  /* Demande au service de vérifier les informations de l'utilisateur */
  logIn(form: any) {
    if (this.service.checkUsrInfo(form.value.usrname, form.value.passwrd)) {
      this.service.goToHomePage();
    }
  }
}
