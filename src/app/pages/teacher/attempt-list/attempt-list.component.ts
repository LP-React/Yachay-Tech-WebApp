import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { AuthService } from '../../../core/services/auth.service';
import { TeacherAttemptSummaryResponse } from '../../../core/models/teacher.models';

@Component({
  selector: 'app-teacher-attempt-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './attempt-list.component.html',
  styleUrls: ['./attempt-list.component.scss']
})
export class TeacherAttemptListComponent {
  attempts: TeacherAttemptSummaryResponse[] = [];
  error = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      mode: ['course', Validators.required],
      id: [null as number | null, Validators.required]
    });

    const session = this.authService.getSession();
    if (!session || session.roleCode !== 'DOCENTE') {
      this.router.navigate(['/login']);
    }
  }

  search(): void {
    if (this.form.invalid) {
      return;
    }

    const session = this.authService.getSession();
    if (!session) {
      this.router.navigate(['/login']);
      return;
    }

    const mode = this.form.value.mode!;
    const id = Number(this.form.value.id);
    this.error = '';
    this.attempts = [];

    if (mode === 'course') {
      this.teacherService.findAttemptsByCourse(id, session.userId).subscribe({
        next: (data) => {
          this.attempts = data;
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'No se pudieron cargar los intentos.';
        }
      });
      return;
    }

    this.teacherService.findAttemptsBySimulation(id, session.userId).subscribe({
      next: (data) => {
        this.attempts = data;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudieron cargar los intentos.';
      }
    });
  }
}