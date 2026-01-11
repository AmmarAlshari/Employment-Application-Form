import { CommonModule } from '@angular/common';
import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
   isOpen = true;

  constructor() {
    this.updateSidebar();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSidebar();
  }

  private updateSidebar() {
    this.isOpen = window.innerWidth >= 768;
  }
}
