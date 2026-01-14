import { Component, OnInit, signal } from '@angular/core';
import { Datatable } from '../datatable';
import { QualificationService } from '../../../../api/qual.service';

@Component({
  standalone: true,
  imports: [Datatable],
  template: `
    <app-datatable
      title="Qualifications"
      buttonTitle="Add qualification"
      searchTitle="Search qualification"
      [data]="qualification()"
      [columns]="columns"
      [onCreate]="createQual"
      [onUpdate]="updateQual"
      [onDelete]="deleteQual"
      [errorMessage]="deleteError()"
      (onCancel)="clearError()"
    />
  `,
})
export class Qualification implements OnInit {
  qualification = signal<any[]>([]);
  deleteError = signal<string | null>(null);

  columns = [
    { key: 'qualificationName', label: 'Qualification' },
    { key: 'qualificationNameAr', label: 'الموهل التعليمي' },
  ];

  constructor(private qualService: QualificationService) {}

  ngOnInit() {
    this.qualService.getQualifications().subscribe((res) => this.qualification.set(res));
  }

  createQual = (payload: any) => {
    this.qualService
      .createQualifications(payload)
      .subscribe((res) => this.qualification.update((c) => [...c, res]));
  };

  updateQual = (id: number, payload: any) => {
    this.qualService
      .updateQualifications(id, payload)
      .subscribe(() =>
        this.qualification.update((c) => c.map((x) => (x.id === id ? { ...x, ...payload } : x)))
      );
  };

  deleteQual = (id: number) => {
    this.qualService.deleteQualifications(id).subscribe({
      next: () => {
        this.qualification.update((c) => c.filter((x) => x.id !== id));
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
