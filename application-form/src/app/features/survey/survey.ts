import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  LookupsService,
  City,
  Nationality,
  SelectedRole,
  Qualification,
} from '../../api/lookups.service';
import { SURVEY_TRANSLATIONS } from '../../i18n/survey.translation';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { enviorments } from '../../../environments/environment';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey.html',
})
export class SurveyComponent implements OnInit {
  isArabic = false;

  constructor(private lookupsService: LookupsService, private http: HttpClient) {
    const path = window.location.pathname;
    this.isArabic = path.includes('Ar');
  }

  cities: City[] = [];
  nationalities: Nationality[] = [];
  selectedRoles: SelectedRole[] = [];
  qualifications: Qualification[] = [];

  ngOnInit(): void {
    forkJoin({
      cities: this.lookupsService.getCities(),
      nationalities: this.lookupsService.getNationalities(),
      roles: this.lookupsService.getSelectedRoles(),
      qualifications: this.lookupsService.getQualifications(),
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.cities = res.cities;
        this.nationalities = res.nationalities;
        this.selectedRoles = res.roles;
        this.qualifications = res.qualifications;
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
  // Helper to get the current text
  get t() {
    return this.isArabic ? this.translations.ar : this.translations.en;
  }

  // Store the actual file object
  selectedFile: File | null = null;
  fileName: string = '';

  surveyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nationalId: new FormControl(''),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^5[0-9]{8}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('Male'),
    nationalityId: new FormControl<number | null>(null, Validators.required),
    qualificationId: new FormControl<number | null>(null),
    major: new FormControl(''),
    isFreshGraduate: new FormControl<boolean>(false),
    currentPosition: new FormControl(''),
    experienceYears: new FormControl(''),
    favoriteCityId: new FormControl<number | null>(null),
    experienceLevel: new FormControl('Beginner'),
    selectedRoleIds: new FormControl<number[]>([]),
    isOtherRoleSelected: new FormControl(false),
    otherRoleRemarks: new FormControl(''),
    remarks: new FormControl(''),
  });

  // Helper for checkbox state
  isRoleSelected(roleId: number): boolean {
    const roles = this.surveyForm.get('selectedRoleIds')?.value ?? [];
    return roles.includes(roleId);
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file) {
      if (file.size > maxSizeInBytes) {
        alert('File size exceeds 2MB limit. Please choose a smaller file.');
        event.target.value = ''; // Reset input
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
  }

  onSubmit() {
    if (!this.surveyForm.valid) {
      this.surveyForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
      return;
    }

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

    console.log('the payload is here ', payload);

    this.http.post(`${enviorments.apiUrl}/applications`, payload).subscribe({
      next: (res: any) => {
        console.log('Application created:', res);

        if (this.selectedFile && res?.id) {
          this.uploadCv(res.id);
        } else {
          this.resetForm();
          alert('Application submitted successfully!');
        }
      },
      error: (err) => {
        console.error('Create application error:', err.error?.message || err);
        alert('Failed to submit application.');
      },
    });
  }

  uploadCv(applicationId: number) {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('cv', this.selectedFile);

    this.http.post(`${enviorments.apiUrl}/applications/${applicationId}/cv`, formData).subscribe({
      next: (res) => {
        console.log('CV uploaded:', res);
        this.resetForm();
        alert('Application submitted successfully!');
      },
      error: (err) => {
        console.error('CV upload error:', err);
        alert('Application saved, but CV upload failed.');
      },
    });
  }
}
