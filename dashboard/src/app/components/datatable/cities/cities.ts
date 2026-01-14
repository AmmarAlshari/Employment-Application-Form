import { Component, OnInit, signal } from '@angular/core';
import { Datatable } from '../datatable';
import { CityService } from '../../../../api/cities.service';

@Component({
  standalone: true,
  imports: [Datatable],
  template: `
    <app-datatable
      title="Cities"
      buttonTitle="Add city"
      searchTitle="Search City"
      [data]="cities()"
      [columns]="columns"
      [onCreate]="createCity"
      [onUpdate]="updateCity"
      [onDelete]="deleteCity"
      [errorMessage]="deleteError()"
      (onCancel)="clearError()"
    />
  `,
})
export class Cities implements OnInit {
  cities = signal<any[]>([]);
  deleteError = signal<string | null>(null);

  columns = [
    { key: 'cityName', label: 'City Name' },
    { key: 'cityNameAr', label: 'اسم المدينه' },
  ];

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.getCities().subscribe((res) => this.cities.set(res));
  }

  createCity = (payload: any) => {
    this.cityService.createCity(payload).subscribe((res) => this.cities.update((c) => [...c, res]));
  };

  updateCity = (id: number, payload: any) => {
    this.cityService
      .updateCity(id, payload)
      .subscribe(() =>
        this.cities.update((c) => c.map((x) => (x.id === id ? { ...x, ...payload } : x)))
      );
  };

  deleteCity = (id: number) => {
    this.cityService.deleteCity(id).subscribe({
      next: () => {
        this.cities.update((c) => c.filter((x) => x.id !== id));
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
