import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-button',
  imports: [MatIconModule],
  templateUrl: './login-button.html',
  styleUrl: './login-button.scss',
})
export class LoginButton {
  constructor(private router: Router, public service: LoginService) {}

  /* Récupère le nom de l'utilisateur connecté */
  getUsrname() {
    var data = JSON.parse(<string>localStorage.getItem('user'));
    return data.usrname;
  }

  /* Ouvre la page de connexion */
  openLoginPage() {
    this.router.navigate(['/login-page']);
  }
}
