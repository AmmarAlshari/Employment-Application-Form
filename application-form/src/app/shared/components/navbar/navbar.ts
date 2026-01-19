import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  isHidden = false;
  private lastScrollTop = 0;

  checkAr() {
    return window.location.pathname.includes('Ar');
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // 1. Hide only after scrolling down a bit (e.g., 50px)
    // 2. Hide if scrolling down, show if scrolling up
    if (currentScroll > this.lastScrollTop && currentScroll > 200) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
