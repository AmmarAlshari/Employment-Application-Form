import { Component, OnInit, signal } from '@angular/core';
import { Datatable } from '../datatable';
import { RoleService } from '../../../../api/selectedRoles.service';

@Component({
  standalone: true,
  imports: [Datatable],
  template: `
    <app-datatable
      title="Cities"
      buttonTitle="Add Role"
      searchTitle="Search title"
      searchTitle="Search title"
      [data]="selectedRoles()"
      [columns]="columns"
      [onCreate]="createRole"
      [onUpdate]="updateRole"
      [onDelete]="deleteRole"
      [errorMessage]="deleteError()"
      (onCancel)="clearError()"
    />
  `,
})
export class SelectedRole implements OnInit {
  selectedRoles = signal<any[]>([]);
  deleteError = signal<string | null>(null);

  columns = [
    { key: 'roleName', label: 'Role Name' },
    { key: 'roleNameAr', label: 'المسى الوظيفي' },
  ];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.roleService.getRoles().subscribe((res) => this.selectedRoles.set(res));
  }

  createRole = (payload: any) => {
    this.roleService
      .createRoles(payload)
      .subscribe((res) => this.selectedRoles.update((c) => [...c, res]));
  };

  updateRole = (id: number, payload: any) => {
    this.roleService
      .updateRoles(id, payload)
      .subscribe(() =>
        this.selectedRoles.update((c) => c.map((x) => (x.id === id ? { ...x, ...payload } : x)))
      );
  };

  deleteRole = (id: number) => {
    this.roleService.deleteRoles(id).subscribe({
      next: () => {
        this.selectedRoles.update((c) => c.filter((x) => x.id !== id));
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
