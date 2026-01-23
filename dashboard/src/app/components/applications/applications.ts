import { Component, OnInit, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../api/data.service';
import { StatusService } from '../../../api/satuts.service';
import { forkJoin, Subscription, finalize } from 'rxjs'; 
import * as XLSX from 'xlsx';
import { enviorments } from '../../../environments/environment';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Application implements OnInit, OnDestroy {
  enviorments = enviorments;
  pageSize = 10;
  private subscriptions = new Subscription();

  currentPage = signal(1);
  applications = signal<any[]>([]);
  statuses = signal<any[]>([]);
  users = signal<any[]>([]);

  isSaving = signal(false);
  searchTerm = signal('');
  deleteMessage = signal<string | null>(null);

  openApplicationId = signal<number | null>(null);
  editingApplicationId = signal<number | null>(null);
  openAssignId = signal<number | null>(null);

  originalStatuses = new Map<number, number>();
  updatedIds = signal<Set<number>>(new Set());

  constructor(
    private dataService: DataService,
    private statusService: StatusService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      forkJoin({
        applications: this.dataService.getApplications(),
        statuses: this.statusService.getStatus(),
        users: this.dataService.getUsers(),
      }).subscribe({
        next: (res: any) => {
          this.applications.set(res.applications || []);
          this.statuses.set(res.statuses || []);
          this.users.set(res.users || []);

          res.applications?.forEach((app: any) => {
            this.originalStatuses.set(app.id, app.ApplicationStatus?.id);
          });
        },
        error: (err) => {
          console.error(err);
          this.deleteMessage.set('Failed to load dashboard data.');
        },
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onStatusSelect(event: any, application: any) {
    const selectedId = event.target.value;
    const statusObj = this.statuses().find((s) => s.id == selectedId);
    if (statusObj) {
      this.select(statusObj, application);
    }
  }

  filteredApplications = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const filtered = this.applications().filter(
      (app) =>
        app.name?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.mobile?.toLowerCase().includes(term) ||
        app.ApplicationStatus?.status?.toLowerCase().includes(term),
    );

    if (this.currentPage() > 1 && filtered.length <= (this.currentPage() - 1) * this.pageSize) {
      this.currentPage.set(1);
    }

    return filtered;
  });

  filteredAssignees = computed(() => {
    const loggedInEmail = this.auth.email();
    return this.users().filter((user) => user.email === loggedInEmail);
  });

  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredApplications().length / this.pageSize));
  });

  paginatedApplications = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredApplications().slice(startIndex, startIndex + this.pageSize);
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  editButton(applicationId: number) {
    this.clearError();
    if (this.editingApplicationId() === applicationId) {
      this.editingApplicationId.set(null);
      this.openApplicationId.set(null);
      this.openAssignId.set(null);
    } else {
      this.editingApplicationId.set(applicationId);
    }
  }

  toggleAssign(applicationId: number) {
    this.openAssignId.set(this.openAssignId() === applicationId ? null : applicationId);
  }

  select(status: any, application: any) {
    application.ApplicationStatus = status;
    this.openApplicationId.set(null);
  }

  assignUser(user: any, application: any) {
    if (application.assignedBy && application.assignedBy.email !== this.auth.email()) {
      this.deleteMessage.set('This application is already claimed by another user.');
      return;
    }

    this.dataService.assignApplication(application.id, user.id).subscribe({
      next: () => {
        application.assignedBy = user;
        this.openAssignId.set(null);
        this.editingApplicationId.set(null);
        this.clearError();
      },
      error: () => this.deleteMessage.set('Failed to assign user.'),
    });
  }

  hasUnsavedChanges(): boolean {
    return this.applications().some(
      (app) => this.originalStatuses.get(app.id) !== app.ApplicationStatus?.id,
    );
  }

  saveAll() {
    const changedApps = this.applications().filter(
      (app) => this.originalStatuses.get(app.id) !== app.ApplicationStatus?.id,
    );

    if (changedApps.length === 0 || this.isSaving()) return;

    this.isSaving.set(true);
    const requests = changedApps.map((app) =>
      this.dataService.updateApplicationStatus(app.id, app.ApplicationStatus.id),
    );

    forkJoin(requests)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => {
          changedApps.forEach((app) => {
            this.originalStatuses.set(app.id, app.ApplicationStatus.id);
          });
          this.updatedIds.set(new Set(changedApps.map((app) => app.id)));
          this.deleteMessage.set('All changes saved successfully!');
          setTimeout(() => this.updatedIds.set(new Set()), 3000); // Clear highlight after 3s
        },
        error: (err) => {
          console.error(err);
          this.deleteMessage.set('Some updates failed. Please refresh and try again.');
        },
      });
  }

  cancelAll() {
    this.clearError();
    this.applications().forEach((app) => {
      const originalStatusId = this.originalStatuses.get(app.id);
      if (originalStatusId !== undefined) {
        const originalStatus = this.statuses().find((s) => s.id === originalStatusId);
        if (originalStatus) app.ApplicationStatus = originalStatus;
      }
    });
    this.updatedIds.set(new Set());
    this.editingApplicationId.set(null);
  }

  onDelete(applicationId: number) {
    if (!confirm('Are you sure you want to delete this application?')) return;

    this.dataService.deletApplications(applicationId).subscribe({
      next: () => {
        this.applications.update((apps) => apps.filter((app) => app.id !== applicationId));
        this.editingApplicationId.set(null);
        this.deleteMessage.set('Application deleted.');
      },
      error: (err) => {
        if (err.status === 400) {
          this.deleteMessage.set('Only delete applications with status REJECTED');
        } else {
          this.deleteMessage.set('An error occurred during deletion.');
        }
      },
    });
  }

  clearError() {
    this.deleteMessage.set(null);
  }

  exportToExcel() {
    if (this.applications().length === 0) {
      this.deleteMessage.set('No data available to export.');
      return;
    }
    const data = this.applications().map((app) => ({
      Name: app.name,
      Email: app.email,
      Phone: app.mobile,
      Status: app.ApplicationStatus?.status,
      City: app.favoriteCity?.cityName,
      Nationality: app.nationality?.countryName,
      AssignedBy: app.assignedBy?.email || '—',
      Remark: app.remarks || '',
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    XLSX.writeFile(workbook, 'applications.xlsx');
  }
}
