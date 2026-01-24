import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datatable.html',
  styleUrl: './datatable.css',
})
export class Datatable {
  constructor(public auth: AuthService) {}
  @Input() title = '';
  @Input() buttonTitle = '';
  @Input() searchTitle = '';
  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string; type?: string }[] = [];
  @Input() errorMessage: string | null = null;

  @Input() onCreate!: (payload: any) => void;
  @Input() onUpdate!: (id: number, payload: any) => void;
  @Input() onDelete!: (id: number) => void;

  @Output() onCancel = new EventEmitter<void>();

  creating = signal(false);
  editingId = signal<number | null>(null);
  form = signal<any>({});

  pageSize = 10;
  currentPage = signal(1);
  searchTerm = signal('');

  filterData<T>(data: T[], keys: string[]): T[] {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return data;

    return data.filter((item) =>
      keys.some((key) => {
        const value = (item as any)[key];
        return typeof value === 'string' && value.toLowerCase().includes(term);
      }),
    );
  }

  filteredData() {
    const searchKeys = this.columns.map((c) => c.key);
    return this.filterData(this.data, searchKeys);
  }

  startCreate() {
    this.creating.set(true);
    this.form.set({});
  }

  pagedData() {
    const filtered = this.filteredData();
    const start = (this.currentPage() - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }

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

  // Handle save update delete

  ngOnChanges() {
    this.currentPage.set(1);
  }

  startEdit(row: any) {
    this.editingId.set(row.id);
    const { id, createdAt, ...clean } = row;
    console.log(row);
    this.form.set(clean);
  }

  cancel() {
    this.creating.set(false);
    this.editingId.set(null);
    this.form.set({});
    this.onCancel.emit();
  }

  saveCreate() {
    this.onCreate(this.form());
    this.cancel();
  }

  saveEdit(id: number) {
    this.onUpdate(id, this.form());
    this.cancel();
  }
}
