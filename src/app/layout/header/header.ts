import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButton } from '../login-button/login-button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  imports: [LoginButton, CommonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  currentMonth: string = this.months[new Date().getMonth()];

  readonly year: number = 2022;

  selectedMonth: string = this.currentMonth;
  currentIndex = this.months.indexOf(this.selectedMonth);

  onPreviousMonth() {
    if (this.currentIndex > 0) {
      this.selectedMonth = this.months[this.currentIndex - 1];
      this.currentIndex--;
    }
  }

  onNextMonth() {
    if (this.currentIndex < this.months.length - 1) {
      this.selectedMonth = this.months[this.currentIndex + 1];
      this.currentIndex++;
    }
  }

  onMonthChange(newMonthid: number) {
    const newMonth = this.months[newMonthid];
    if (this.months.includes(newMonth)) {
      this.selectedMonth = newMonth;
    }
  }
}
