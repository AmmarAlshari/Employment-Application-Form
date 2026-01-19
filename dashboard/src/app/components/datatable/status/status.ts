import { Component, OnInit, signal } from '@angular/core';
import { Datatable } from '../datatable';
import { StatusService } from '../../../../api/satuts.service';

@Component({
  standalone: true,
  imports: [Datatable],
  template: `
    <app-datatable
      title="Status"
      buttonTitle="Add Status"
      searchTitle="Search Status"
      [data]="status()"
      [columns]="columns"
      [onCreate]="createStatus"
      [onUpdate]="updateStatus"
      [onDelete]="deleteStatus"
      [errorMessage]="deleteError()"
      (onCancel)="clearError()"
    />
  `,
})
export class Status implements OnInit {
  status = signal<any[]>([]);
  deleteError = signal<string | null>(null);

  columns = [{ key: 'status', label: 'Status' }];

  constructor(private statusReo: StatusService) {}

  ngOnInit() {
    this.statusReo.getStatus().subscribe((res) => this.status.set(res));
  }

  createStatus = (payload: any) => {
    this.statusReo.createStatus(payload).subscribe((res) => this.status.update((c) => [...c, res]));
  };

  updateStatus = (id: number, payload: any) => {
    this.statusReo
      .updateStatus(id, payload)
      .subscribe(() =>
        this.status.update((c) => c.map((x) => (x.id === id ? { ...x, ...payload } : x))),
      );
  };

  deleteStatus = (id: number) => {
    this.statusReo.deleteStatus(id).subscribe({
      next: () => {
        this.status.update((c) => c.filter((x) => x.id !== id));
        this.deleteError.set(null);
      },
      error: (err) => {
        if (err.status === 400 || err.status === 409 || err.status === 500) {
          this.deleteError.set('cannot deleted this value linked to application');
        }
      },
    });
  };
  clearError() {
    this.deleteError.set(null);
  }
}
