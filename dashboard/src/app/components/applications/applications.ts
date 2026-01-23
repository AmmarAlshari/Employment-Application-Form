import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../api/data.service';
import { StatusService } from '../../../api/satuts.service';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { enviorments } from '../../../environments/environment';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Application implements OnInit {
  enviorments = enviorments;
  pageSize = 10;

  currentPage = signal(1);
  applications = signal<any[]>([]);
  statuses = signal<any[]>([]);
  users = signal<any[]>([]);

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
    public auth: AuthService, //
  ) {}

  ngOnInit() {
    forkJoin({
      applications: this.dataService.getApplications(),
      statuses: this.statusService.getStatus(),
      users: this.dataService.getUsers(),
    }).subscribe({
      next: (res: any) => {
        this.applications.set(res.applications);
        this.statuses.set(res.statuses);
        this.users.set(res.users);

        res.applications.forEach((app: any) => {
          this.originalStatuses.set(app.id, app.ApplicationStatus?.id);
        });
      },
      error: (err) => console.error(err),
    });
  }
  
  filteredAssignees = computed(() => {
    const loggedInEmail = this.auth.email(); // Assuming auth.email is a signal or getter
    return this.users().filter((user) => user.email === loggedInEmail);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredApplications().length / this.pageSize);
  });

  paginatedApplications = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredApplications().slice(startIndex, endIndex);
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

  toggle(applicationId: number) {
    this.openApplicationId.set(this.openApplicationId() === applicationId ? null : applicationId);
  }

  toggleAssign(applicationId: number) {
    this.openAssignId.set(this.openAssignId() === applicationId ? null : applicationId);
  }

  select(status: any, application: any) {
    application.ApplicationStatus = status;
    this.openApplicationId.set(null);
    this.editingApplicationId.set(null);
  }

  assignUser(user: any, application: any) {
    // 1. Prevent action if already assigned to someone else
    if (application.assignedBy && application.assignedBy.email !== this.auth.email()) {
      this.deleteMessage.set('This application is already claimed by another user.');
      return;
    }

    this.dataService.assignApplication(application.id, user.id).subscribe({
      next: () => {
        application.assignedBy = user;
        this.openAssignId.set(null);
        this.editingApplicationId.set(null);
        this.clearError(); // Clear any previous messages
      },
      error: (err) => console.error(err),
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

    changedApps.forEach((app) => {
      this.dataService.updateApplicationStatus(app.id, app.ApplicationStatus.id).subscribe();
    });

    changedApps.forEach((app) => {
      this.originalStatuses.set(app.id, app.ApplicationStatus.id);
    });

    this.updatedIds.set(new Set(changedApps.map((app) => app.id)));
  }

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
    this.openAssignId.set(null);
  }

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

  exportToExcel() {
    const data = this.applications().map((app) => ({
      Name: app.name,
      Email: app.email,
      Phone: app.mobile,
      Status: app.ApplicationStatus?.status,
      City: app.favoriteCity?.cityName,
      Nationality: app.nationality?.countryName,
      AssignedBy: app.assignedBy?.email || '—',
      remark: app.remarks,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'applications.xlsx');
  }
}
