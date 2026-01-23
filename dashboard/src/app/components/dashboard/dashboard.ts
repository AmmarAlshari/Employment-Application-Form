import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataService } from '../../../api/data.service';

import {
  ApexChart,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexDataLabels,
  ApexGrid,
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  applications = signal<any[]>([]);
  users = signal<any[]>([]);

  constructor(private dataService: DataService) {}

  ngOnInit() {
    forkJoin({
      applications: this.dataService.getApplications(),
      users: this.dataService.getUsers(),
    }).subscribe({
      next: (res: any) => {
        this.applications.set(res.applications || []);
        this.users.set(res.users || []);
      },
      error: (err) => console.error(err),
    });
  }

  totalApplications = computed(() => this.applications().length);
  totalUsers = computed(() => this.users().length);

  statusStats = computed(() => {
    const map = new Map<string, number>();
    this.applications().forEach((app) => {
      const status = app.ApplicationStatus?.status || 'Unknown';
      map.set(status, (map.get(status) || 0) + 1);
    });
    return Array.from(map.entries()).map(([status, count]) => ({ status, count }));
  });

  topCities = computed(() => {
    const map = new Map<string, number>();
    this.applications().forEach((app) => {
      const city = app.favoriteCity?.cityName;
      if (city) map.set(city, (map.get(city) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  topNationalities = computed(() => {
    const map = new Map<string, number>();
    this.applications().forEach((app) => {
      const nat = app.nationality?.countryName;
      if (nat) map.set(nat, (map.get(nat) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([nationality, count]) => ({ nationality, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  statusPieChart = computed(() => ({
    series: this.statusStats().map((s) => s.count) as ApexNonAxisChartSeries,
    chart: {
      type: 'donut' as const,
      height: 350,
      fontFamily: 'inherit',
      animations: { enabled: true, speed: 400 },
    } as ApexChart,
    labels: this.statusStats().map((s) => s.status),
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'],
    stroke: { show: false } as ApexStroke,
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: { show: true, label: 'Total', fontSize: '14px', fontWeight: 600 },
          },
        },
      },
    } as ApexPlotOptions,
    legend: {
      position: 'bottom',
      fontSize: '13px',
      fontWeight: 500,
      markers: { radius: 12 },
    } as ApexLegend,
  }));

  cityBarChart = computed(() => ({
    series: [
      {
        name: 'Applications',
        data: this.topCities().map((c) => c.count),
      },
    ] as ApexAxisChartSeries,
    chart: {
      type: 'bar' as const,
      height: 350,
      fontFamily: 'inherit',
      toolbar: { show: false },
    } as ApexChart,
    colors: ['#6366f1'],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '40%',
        distributed: false,
      },
    } as ApexPlotOptions,
    dataLabels: { enabled: false } as ApexDataLabels,
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    } as ApexGrid,
    xaxis: {
      categories: this.topCities().map((c) => c.city),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748b', fontWeight: 500 } },
    } as ApexXAxis,
  }));
  nationalityBarChart = computed(() => ({
    series: [{ name: 'Applications', data: this.topNationalities().map(n => n.count) }] as ApexAxisChartSeries,
    chart: { type: 'bar' as const, height: 350, toolbar: { show: false } } as ApexChart,
    plotOptions: { bar: { borderRadius: 8, columnWidth: '45%' } } as ApexPlotOptions,
    xaxis: { categories: this.topNationalities().map(n => n.nationality), axisBorder: { show: false } } as ApexXAxis
  }));
}
