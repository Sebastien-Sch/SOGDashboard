import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  activeSection: string = 'home';

  ngOnInit() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeSection = entry.target.id;
            }
          });
        },
        { threshold: 0.6 } // section visible à 60 %
      );

      sections.forEach((sec) => observer.observe(sec));
  }

  goTo(id: string) {
    const e = document.getElementById(id);
    if (e) {
      e.scrollIntoView({ behavior: 'smooth' });
      }
  }
}
