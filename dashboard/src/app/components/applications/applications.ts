import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../api/data.service';
import { StatusService } from '../../../api/satuts.service';
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
  statuses = signal<any[]>([]);
  searchTerm = signal('');
  deleteMessage = signal<string | null>(null);

  openApplicationId = signal<number | null>(null);
  editingApplicationId = signal<number | null>(null);

  // store ORIGINAL status id per application
  originalStatuses = new Map<number, number>();

  // track updated rows
  updatedIds = signal<Set<number>>(new Set());

  constructor(
    private dataService: DataService,
    private statusService: StatusService,
  ) {}

  ngOnInit() {
    forkJoin({
      applications: this.dataService.getApplications(),
      statuses: this.statusService.getStatus(),
    }).subscribe({
      next: (res: any) => {
        this.applications.set(res.applications);
        this.statuses.set(res.statuses);

        // store original status IDs
        res.applications.forEach((app: any) => {
          this.originalStatuses.set(app.id, app.ApplicationStatus?.id);
        });
      },
      error: (err) => console.error(err),
    });
  }

  // SEARCH
  filteredApplications = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.applications().filter(
      (app) =>
        app.name?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.mobile?.toLowerCase().includes(term) ||
        app.ApplicationStatus?.status?.toLowerCase().includes(term),
    );
  });

  // EDIT MODE
  editButton(applicationId: number) {
    this.clearError();
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

  // SELECT STATUS (keep full object)
  select(status: any, application: any) {
    application.ApplicationStatus = status;
    this.openApplicationId.set(null);
    this.editingApplicationId.set(null);
  }

  // UNSAVED CHANGES CHECK
  hasUnsavedChanges(): boolean {
    return this.applications().some(
      (app) => this.originalStatuses.get(app.id) !== app.ApplicationStatus?.id,
    );
  }

  // SAVE ALL CHANGES
  saveAll() {
    const changedApps = this.applications().filter(
      (app) => this.originalStatuses.get(app.id) !== app.ApplicationStatus?.id,
    );

    changedApps.forEach((app) => {
      this.dataService.updateApplicationStatus(app.id, app.ApplicationStatus.id).subscribe();
    });

    // commit locally
    changedApps.forEach((app) => {
      this.originalStatuses.set(app.id, app.ApplicationStatus.id);
    });

    this.updatedIds.set(new Set(changedApps.map((app) => app.id)));
  }

  // CANCEL ALL CHANGES
  cancelAll() {
    this.clearError();
    this.applications().forEach((app) => {
      const originalStatusId = this.originalStatuses.get(app.id);
      if (originalStatusId != null) {
        const originalStatus = this.statuses().find((s) => s.id === originalStatusId);
        if (originalStatus) {
          app.ApplicationStatus = originalStatus;
        }
      }
    });

    this.updatedIds.set(new Set());
    this.openApplicationId.set(null);
    this.editingApplicationId.set(null);
  }

  //delete application
  onDelete(applicationId: number) {
    this.dataService.deletApplications(applicationId).subscribe({
      next: () => {
        this.applications.update((apps) => apps.filter((app) => app.id !== applicationId));
        this.editingApplicationId.set(null);
        this.openApplicationId.set(null);
      },

      error: (err) => {
        if (err.status === 400) {
          this.deleteMessage.set('Only delete applications with status REJECTED');
        }
      },
    });
  }
  clearError() {
    this.deleteMessage.set(null);
  }
}
