import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { SurveyComponent } from './features/survey/survey';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent, FooterComponent, SurveyComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
}
