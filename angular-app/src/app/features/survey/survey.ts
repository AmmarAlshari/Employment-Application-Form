import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey.html',
})
export class SurveyComponent {
  // Inject the tools we need
  private route = inject(ActivatedRoute);

  isArabic = false;

  constructor() {
    // Logic to detect if the URL is 'IndexAr'
    const path = window.location.pathname;
    this.isArabic = path.includes('Ar');

    // Update the page direction (RTL for Arabic, LTR for English)
    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';
  }

  translations: any = {
  en: {
    namePlaceholder: 'Enter your full name',
    idPlaceholder: '10 digits starting with 1 or 2',
    mobilePlaceholder: '5xxxxxxxx',
    emailPlaceholder: 'example@mail.com',
    majorPlaceholder: 'e.g. Computer Science',
    othersPlaceholder: 'Please specify (e.g. Driver, clerk...)',
    title: 'Employment Application Form',
    name: 'Name',
    nationality: 'Nationality',
    id: 'National ID',
    mobile: 'Mobile Number',
    email: 'Email',
    gender: 'Gender',
    qualification: 'Qualification',
    major: 'Major',
    male: 'Male',
    female: 'Female',
    submit: 'Submit Application',
    rolesTitle: 'Job Role',
    rolesSub: 'Which job would you choose?',
    cvLabel: 'Upload resume (PDF only)'
  },
  ar: {
    namePlaceholder: 'أدخل الاسم الكامل',
    idPlaceholder: '10 أرقام تبدأ بـ 1 أو 2',
    mobilePlaceholder: '5xxxxxxxx',
    emailPlaceholder: 'example@mail.com',
    majorPlaceholder: 'مثال: علوم حاسب',
    othersPlaceholder: 'يرجى التحديد (مثال: سائق، كاتب...)',
    title: 'نموذج طلب التوظيف - المجدوعي',
    name: 'الاسم',
    id: 'الهوية الوطنية',
    mobile: 'رقم الجوال',
    email: 'البريد الإلكتروني',
    gender: 'الجنس',
    male: 'ذكر',
    major: 'التخصص',
    nationality: 'الجنسية',
    qualification: 'المؤهل العلمي',
    female: 'أنثى',
    submit: 'إرسال الطلب',
    rolesTitle: 'المسمى الوظيفي',
    rolesSub: 'ما هي الوظيفة التي تود اختيارها؟',
    cvLabel: 'رفع السيرة الذاتية (PDF فقط)'
  }
};

// Helper to get the current text
get t() {
  return this.isArabic ? this.translations.ar : this.translations.en;
}

  // Store the actual file object
  selectedFile: File | null = null;
  fileName: string = '';

  jobRoles = [
  { key: 'Finance', en: 'Finance', ar: 'المالية' },
  { key: 'Accounting', en: 'Accounting', ar: 'المحاسبة' },
  { key: 'Human resources', en: 'Human resources', ar: 'الموارد البشرية' },
  { key: 'Marketing', en: 'Marketing', ar: 'التسويق' },
  { key: 'Sales', en: 'Sales', ar: 'المبيعات' },
  { key: 'Supply Chain', en: 'Supply Chain', ar: 'سلسلة الامدادات واللوجستيات' },
  { key: 'Strategy', en: 'Strategy', ar: 'القطاع الاستراتيجي' },
  { key: 'Procurement', en: 'Procurement', ar: 'المشتريات' },
  { key: 'Organization Development', en: 'Organization Development', ar: 'التطوير التنظيمي' },
  { key: 'Engineering', en: 'Engineering', ar: 'الهندسة' },
  { key: 'Secretary', en: 'Secretary', ar: 'السكرتارية' },
  { key: 'Real Estate Field', en: 'Real Estate Field', ar: 'قطاع الأملاك والعقار' },
  { key: 'Auditing', en: 'Auditing', ar: 'التدقيق' },
  { key: 'Information Technology', en: 'Information Technology', ar: 'تقنية المعلومات' },
  { key: 'Networking', en: 'Networking', ar: 'شبكات' },
  { key: 'Programming', en: 'Programming', ar: 'البرمجة' },
  { key: 'Business Solution', en: 'Business Solution', ar: 'حلول الأعمال' },
  { key: 'Investment', en: 'Investment', ar: 'قطاع الاستثمار' },
  { key: 'Customer Service', en: 'Customer Service', ar: 'خدمة العملاء' },
  { key: 'Technician', en: 'Technician', ar: 'فني صيانة' },
  { key: 'Others', en: 'Others', ar: 'اخرى' }
];

  surveyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nationalId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^5[0-9]{8}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('Male'),
    nationality: new FormControl('', Validators.required),
    qualification: new FormControl(''),
    major: new FormControl(''),
    isFreshGraduate: new FormControl('No'),
    currentPosition: new FormControl(''),
    experienceYears: new FormControl(''),
    favoriteCity: new FormControl(''),
    experienceLevel: new FormControl('Beginner'),
    selectedRoles: new FormControl([] as string[]),
    otherRoleRemarks: new FormControl(''),
    remarks: new FormControl(''),
  });

  // Helper for checkbox state
  isRoleSelected(role: string): boolean {
    const roles = this.surveyForm.get('selectedRoles')?.value || [];
    return roles.includes(role);
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
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only.');
        event.target.value = ''; // Reset input
        return;
      }
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onRoleChange(role: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentRoles = this.surveyForm.get('selectedRoles')?.value || [];

    if (isChecked) {
      this.surveyForm.get('selectedRoles')?.setValue([...currentRoles, role]);
    } else {
      this.surveyForm.get('selectedRoles')?.setValue(currentRoles.filter((r) => r !== role));
    }
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      // Create FormData for Multipart/Form-Data request
      const formData = new FormData();

      // Add the file if it exists
      if (this.selectedFile) {
        formData.append('cv', this.selectedFile, this.selectedFile.name);
      }

      // Add all form text fields
      const formValues = this.surveyForm.getRawValue();
      Object.keys(formValues).forEach((key) => {
        // Convert arrays to strings if necessary, or append individually
        const value = formValues[key as keyof typeof formValues];
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      console.log('FormData ready for backend. Contents:');
      formData.forEach((value, key) => console.log(`${key}:`, value));

      // Typical HTTP call:
      // this.http.post('YOUR_API_URL', formData).subscribe(res => console.log(res));
    } else {
      this.surveyForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }
}
