import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../../../api/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users = signal<any[]>([]);
  creatingUser = signal(false);
  errorMessage = signal<string | null>(null);
  isSubmitting = signal(false);

  newUser = signal({
    email: '',
    password: '',
    role: 'HR',
  });

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe({
      next: (res: any) => this.users.set(res),
      error: (err) => this.handleError(err),
    });
  }

  startCreateUser() {
    this.errorMessage.set(null);
    this.creatingUser.set(true);
  }

  cancelCreateUser() {
    this.creatingUser.set(false);
    this.errorMessage.set(null);
    this.resetForm(); // This was the cause of the error
  }

  // Added this method to fix TS2339
  resetForm() {
    this.newUser.set({
      email: '',
      password: '',
      role: 'HR',
    });
  }

  saveNewUser() {
    const payload = this.newUser();

    if (!payload.email || !payload.email.includes('@')) {
      this.errorMessage.set('Please enter a valid email address.');
      return;
    }
    if (!payload.password || payload.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.dataService.createUser(payload).subscribe({
      next: (res: any) => {
        this.users.update((users) => [...users, res]);
        this.creatingUser.set(false);
        this.resetForm();
        this.isSubmitting.set(false);
      },
      error: (err) => {
        this.handleError(err);
        this.isSubmitting.set(false);
      },
    });
  }

  deleteUser(user: any) {
    if (user.role === 'ADMIN') {
      this.errorMessage.set('System Error: Administrative accounts cannot be deleted.');
      setTimeout(() => this.errorMessage.set(null), 5000);
      return;
    }

    if (!confirm(`Are you sure you want to delete ${user.email}?`)) {
      return;
    }

    this.dataService.deleteUser(user.id).subscribe({
      next: () => {
        this.users.update((users) => users.filter((u) => u.id !== user.id));
        this.errorMessage.set(null);
      },
      error: (err) => this.handleError(err),
    });
  }

  private handleError(err: any) {
    const msg = err.error?.message || err.statusText || 'An unexpected error occurred.';
    this.errorMessage.set(msg);
    setTimeout(() => this.errorMessage.set(null), 6000);
  }
}
