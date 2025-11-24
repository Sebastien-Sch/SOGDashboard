import { Component } from '@angular/core';
import { LoginButton } from '../login-button/login-button';

@Component({
  selector: 'app-header',
  imports: [LoginButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
}
