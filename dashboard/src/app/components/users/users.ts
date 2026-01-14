import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../../../api/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users = signal<any[]>([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe({
      next: (res: any) => {
        this.users.set(res);
      },
      error: (err) => console.error(err),
    });
  }

  creatingUser = signal(false);

  newUser = signal({
    email: '',
    password: '',
    role: 'HR',
  });

  startCreateUser() {
    this.creatingUser.set(true);
  }

  cancelCreateUser() {
    this.creatingUser.set(false);
    this.newUser.set({
      email: '',
      password: '',
      role: 'HR',
    });
  }

  saveNewUser() {
    const payload = this.newUser();

    this.dataService.createUser(payload).subscribe({
      next: (res: any) => {
        // add new user instantly to the table
        this.users.update((users) => [...users, res]);

        // reset UI state
        this.creatingUser.set(false);
        this.newUser.set({
          email: '',
          password: '',
          role: 'HR',
        });
      },
      error: (err) => console.error(err),
    });
  }
}
