import { Injectable, signal, computed } from '@angular/core';

function decodeToken(token: string): any | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = signal<string | null>(localStorage.getItem('token'));
  private decoded = signal<any | null>(null);

  constructor() {
    const activeTokoen = this.token();
    if (activeTokoen) {
      this.decoded.set(decodeToken(activeTokoen));
    }
  }

  // ===== PUBLIC SIGNALS =====

  isLoggedIn = computed(() => !!this.token());

  role = computed(() => this.decoded()?.role ?? null);
  userId = computed(() => this.decoded()?.sub ?? null);
  email = computed(() => this.decoded()?.email ?? null);

  // ===== METHODS =====

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
    this.decoded.set(decodeToken(token));
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.decoded.set(null);
  }
}
