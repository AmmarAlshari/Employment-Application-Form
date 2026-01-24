import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LookupsService } from '../../api/lookups.service';
import { SURVEY_TRANSLATIONS } from '../../i18n/survey.translation';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { enviorments } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxCaptchaModule],
  templateUrl: './survey.html',
})
export class SurveyComponent implements OnInit {
  isArabic = false;

  constructor(
    private lookupsService: LookupsService,
    private http: HttpClient,
    private router: Router,
  ) {
    const path = window.location.pathname;
    this.isArabic = path.includes('Ar');
  }
  isSubmitting = signal(false);
  cities = signal<any[]>([]);
  nationalities = signal<any[]>([]);
  roles = signal<any[]>([]);
  qualifications = signal<any[]>([]);

  ngOnInit(): void {
    forkJoin({
      cities: this.lookupsService.getCities(),
      nationalities: this.lookupsService.getNationalities(),
      roles: this.lookupsService.getSelectedRoles(),
      qualifications: this.lookupsService.getQualifications(),
    }).subscribe({
      next: (res) => {
        this.cities.set(res.cities);
        this.nationalities.set(res.nationalities);
        this.roles.set(res.roles);
        this.qualifications.set(res.qualifications);
      },
      error: (err) => console.error(err),
    });
    this.surveyForm.get('isOtherRoleSelected')?.valueChanges.subscribe((checked) => {
      if (!checked) {
        this.surveyForm.get('otherRoleRemarks')?.reset();
      }
    });
  }

  translations = SURVEY_TRANSLATIONS;
  get t() {
    return this.isArabic ? this.translations.ar : this.translations.en;
  }

  selectedFile: File | null = null;
  fileName: string = '';
  fileError: string = ''; 

  surveyForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s-]+$/),
    ]),
    nationalId: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^[12]\d{9}$/),
    ]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^5[0-9]{8}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nationalityId: new FormControl<number | null>(null, Validators.required),
    gender: new FormControl('Male'),
    qualificationId: new FormControl<number | null>(null),
    major: new FormControl(''),
    isFreshGraduate: new FormControl<boolean>(false),
    currentPosition: new FormControl(''),
    experienceYears: new FormControl(''),
    favoriteCityId: new FormControl<number | null>(null),
    experienceLevel: new FormControl('Beginner'),
    selectedRoleIds: new FormControl<number[]>([], Validators.required),
    isOtherRoleSelected: new FormControl(false),
    otherRoleRemarks: new FormControl(''),
    remarks: new FormControl('', [Validators.maxLength(250)]),
  });

  isRoleSelected(roleId: number): boolean {
    const roles = this.surveyForm.get('selectedRoleIds')?.value ?? [];
    return roles.includes(roleId);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024;
    this.fileError = ''; 

    if (file) {
      if (file.size > maxSizeInBytes) {
        this.fileError = 'File size must be less than 2MB';
        event.target.value = '';
        this.selectedFile = null;
        this.fileName = '';
        return;
      }

      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onRoleChange(roleId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentRoles = this.surveyForm.get('selectedRoleIds')?.value ?? [];

    if (isChecked) {
      this.surveyForm.get('selectedRoleIds')?.setValue([...currentRoles, roleId]);
    } else {
      this.surveyForm.get('selectedRoleIds')?.setValue(currentRoles.filter((id) => id !== roleId));
    }
  }

  resetForm() {
    this.surveyForm.reset();
    this.selectedFile = null;
    this.fileName = '';
    this.fileError = '';
  }

  onSubmit() {
    // 1. Validate Text Fields

    if (this.isSubmitting()) {
      return;
    }

    if (!this.surveyForm.valid) {
      this.surveyForm.markAllAsTouched();
      return window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 2. Validate CV (Required)
    if (!this.selectedFile) {
      this.fileError = 'CV is required';
      // Scroll to the file upload section
      document.getElementById('cv-upload')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    this.isSubmitting.set(true);

    const raw = this.surveyForm.getRawValue();

    const payload: any = {
      name: raw.name,
      nationalId: raw.nationalId,
      mobile: raw.mobile,
      email: raw.email,
      gender: raw.gender,
      nationalityId: raw.nationalityId,
      qualificationId: raw.qualificationId ?? undefined,
      favoriteCityId: raw.favoriteCityId ?? undefined,
      major: raw.major || undefined,
      currentPosition: raw.currentPosition || undefined,
      experienceYears: raw.experienceYears ?? undefined,
      experienceLevel: raw.experienceLevel,
      selectedRoleIds: raw.selectedRoleIds,
      isFreshGraduate: raw.isFreshGraduate,
      otherRoleRemarks: raw.isOtherRoleSelected ? raw.otherRoleRemarks || undefined : undefined,
      remarks: raw.remarks || undefined,
    };

    this.http.post(`${enviorments.apiUrl}/applications`, payload).subscribe({
      next: (res: any) => {
        if (this.selectedFile && res?.id) {
          this.uploadCv(res.id);
          this.router.navigate(['/application-success']);
        }
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Create application error:', err.error?.message || err);
        alert('Failed to submit application.');
        this.isSubmitting.set(false);
      },
    });
  }

  uploadCv(applicationId: number) {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('cv', this.selectedFile);

    this.http.post(`${enviorments.apiUrl}/applications/${applicationId}/cv`, formData).subscribe({
      next: (res) => {
        this.resetForm();
      },
      error: (err) => {
        console.error('CV upload error:', err);
        alert('Application saved, but CV upload failed.');
      },
    });
  }
}
