import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginDataUrl = '/data/data.json';
  private usrs: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getLoginData();
  }

  /* Récupère les données des utilisateurs dans le fichier data.json */
  getLoginData() {
    this.http.get<any[]>(this.loginDataUrl).subscribe(data => {
      this.usrs = data;
    });
  }

  /* Vérifie les informations de l'utilisateur */
  checkUsrInfo(usrname: string, passwrd: string): boolean {
    for (var usr of this.usrs) {
      if ((usrname == usr.usrname) && (passwrd == usr.passwrd)) {
        console.log("Connexion réussie !");
        var token = {usrname: usrname, loggedIn: true, fabId: usr.id};
        localStorage.setItem('user', JSON.stringify(token));
        return true;
      }
    }
    console.log("Mauvais nom d'utilisateur ou mot de passe. Veuillez réessayer.");
    return false;
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  goToLoginPage() {
    this.router.navigate(['/login-page']);
  }

  /* Vérifie si l'utilisateur est connecté */
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).loggedIn : false;
  }

  logOut() {
    localStorage.clear();
    this.goToLoginPage();
  }
}
