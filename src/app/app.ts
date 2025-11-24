import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Navbar } from './layout/navbar/navbar';
import { LoginService } from './services/loginService/login-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('sog-dashboard');

  constructor(private logService: LoginService, private router: Router) {}

  ngOnInit() {
    if (!this.logService.isLoggedIn()) {
      this.router.navigate(['/login-page']);
    }
  }
}
