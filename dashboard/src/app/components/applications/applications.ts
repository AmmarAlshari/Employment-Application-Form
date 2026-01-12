import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../api/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Application implements OnInit {
  applications = signal<any[]>([]);
  searchTerm = signal('');
  openApplicationId = signal<number | null>(null);
  editingApplicationId = signal<number | null>(null);

  // NEW: keep original values
  originalStatuses = new Map<number, string>();

  options = ['NEW', 'UNDER_REVIEW', 'INTERVIEW', 'ACCEPTED', 'REJECTED'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    forkJoin({
      applications: this.dataService.getUsers(),
    }).subscribe({
      next: (res: any) => {
        this.applications.set(res.applications);

        // store original statuses
        res.applications.forEach((app: any) => {
          this.originalStatuses.set(app.id, app.ApplicationStatus);
        });
      },
      error: (err) => console.error(err),
    });
  }

  filteredApplications = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.applications().filter(
      (app) =>
        app.name?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.mobile?.toLowerCase().includes(term) ||
        app.ApplicationStatus?.toLowerCase().includes(term)
    );
  });

  editButton(applicationId: number) {
    if (this.editingApplicationId() === applicationId) {
      this.editingApplicationId.set(null);
      this.openApplicationId.set(null);
    } else {
      this.editingApplicationId.set(applicationId);
    }
  }

  toggle(applicationId: number) {
    this.openApplicationId.set(this.openApplicationId() === applicationId ? null : applicationId);
  }

  select(option: string, application: any) {
    application.ApplicationStatus = option;
    this.openApplicationId.set(null);
    this.editingApplicationId.set(null);
  }

  // NEW: detect unsaved changes
  hasUnsavedChanges(): boolean {
    return this.applications().some(
      (app) => this.originalStatuses.get(app.id) !== app.ApplicationStatus
    );
  }

  // NEW: save all changes
  saveAll() {
    const payload = this.applications()
      .filter((app) => this.originalStatuses.get(app.id) !== app.ApplicationStatus)
      .map((app) => ({
        id: app.id,
        status: app.ApplicationStatus,
      }));

    console.log(payload);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'INTERVIEW':
        return 'bg-purple-100 text-purple-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
