import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../../../api/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  applications = signal<any[]>([]);

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getApplications().subscribe({
      next: (res: any) => this.applications.set(res),
      error: (err) => console.error(err),
    });
  }

  // ===== KPI CARDS =====
  totalApplications = computed(() => this.applications().length);

  newApplications = computed(
    () => this.applications().filter(a => a.ApplicationStatus?.status === 'NEW').length
  );

  acceptedApplications = computed(
    () => this.applications().filter(a => a.ApplicationStatus?.status === 'ACCEPTED').length
  );

  rejectedApplications = computed(
    () => this.applications().filter(a => a.ApplicationStatus?.status === 'REJECTED').length
  );

  // ===== PIE: STATUS DISTRIBUTION =====
  statusChartData = computed(() => {
    const map = new Map<string, number>();

    this.applications().forEach(app => {
      const status = app.ApplicationStatus?.status || 'UNKNOWN';
      map.set(status, (map.get(status) || 0) + 1);
    });

    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  });

  // ===== BAR: TOP CITIES =====
  cityChartData = computed(() => {
    const map = new Map<string, number>();

    this.applications().forEach(app => {
      const city = app.favoriteCity?.cityName;
      if (!city) return;
      map.set(city, (map.get(city) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  });

  // ===== BAR: TOP NATIONALITIES =====
  nationalityChartData = computed(() => {
    const map = new Map<string, number>();

    this.applications().forEach(app => {
      const nationality = app.nationality?.countryName;
      if (!nationality) return;
      map.set(nationality, (map.get(nationality) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  });
}
