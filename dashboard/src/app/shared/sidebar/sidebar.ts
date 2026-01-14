import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router, public auth: AuthService) {}

  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  isSignOut() {
    this.auth.logout();
    this.router.navigate(['/auth/signin']);
  }

  dataTableOpen = false;

  toggleDataTable() {
    this.dataTableOpen = !this.dataTableOpen;
  }
}
