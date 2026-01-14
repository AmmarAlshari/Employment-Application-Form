import { Component, OnInit, signal } from '@angular/core';
import { Datatable } from '../datatable';
import { NationalityService } from '../../../../api/nationalty.service';

@Component({
  standalone: true,
  imports: [Datatable],
  template: `
    <app-datatable
      title="Nationalty"
      buttonTitle="Add nationalty"
      searchTitle="Search nationalty"
      [data]="nationalities()"
      [columns]="columns"
      [onCreate]="createNatio"
      [onUpdate]="updateNatio"
      [onDelete]="deleteNatio"
      [errorMessage]="deleteError()"
      (onCancel)="clearError()"
    />
  `,
})
export class Nationalities implements OnInit {
  nationalities = signal<any[]>([]);
  deleteError = signal<string | null>(null);

  columns = [
    { key: 'countryName', label: 'Nationalty' },
    { key: 'countryNameAr', label: 'الجنسية' },
  ];

  constructor(private natService: NationalityService) {}

  ngOnInit() {
    this.natService.getNationality().subscribe((res) => this.nationalities.set(res));
  }

  createNatio = (payload: any) => {
    this.natService
      .createNationality(payload)
      .subscribe((res) => this.nationalities.update((c) => [...c, res]));
  };

  updateNatio = (id: number, payload: any) => {
    this.natService
      .updateNationalityy(id, payload)
      .subscribe(() =>
        this.nationalities.update((c) => c.map((x) => (x.id === id ? { ...x, ...payload } : x)))
      );
  };

  deleteNatio = (id: number) => {
    this.natService.deleteNationality(id).subscribe({
      next: () => {
        this.nationalities.update((c) => c.filter((x) => x.id !== id));
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
