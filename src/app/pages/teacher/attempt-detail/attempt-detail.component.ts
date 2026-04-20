import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../../../core/services/teacher.service';
import { AuthService } from '../../../core/services/auth.service';
import {
  AttemptReviewResponse,
  AttemptStepTraceResponse,
  TeacherAttemptDetailResponse
} from '../../../core/models/teacher.models';

@Component({
  selector: 'app-teacher-attempt-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './attempt-detail.component.html',
  styleUrls: ['./attempt-detail.component.scss']
})
export class TeacherAttemptDetailComponent implements OnInit {
  attemptId = 0;
  detail!: TeacherAttemptDetailResponse;
  trace: AttemptStepTraceResponse[] = [];
  reviews: AttemptReviewResponse[] = [];
  error = '';
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private authService: AuthService
  ) {
    this.reviewForm = this.fb.group({
      manualScore: [null as number | null, [Validators.min(0), Validators.max(20)]],
      comments: ['']
    });
  }

  ngOnInit(): void {
    const session = this.authService.getSession();

    if (!session || session.roleCode !== 'DOCENTE') {
      this.router.navigate(['/login']);
      return;
    }

    this.attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));
    this.loadAll();
  }

  loadAll(): void {
    const session = this.authService.getSession();
    if (!session) {
      return;
    }

    this.teacherService.getAttemptDetail(this.attemptId, session.userId).subscribe({
      next: (data) => {
        this.detail = data;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo cargar el detalle.';
      }
    });

    this.teacherService.getAttemptTrace(this.attemptId, session.userId).subscribe({
      next: (data) => {
        this.trace = data;
      }
    });

    this.teacherService.getAttemptReviews(this.attemptId, session.userId).subscribe({
      next: (data) => {
        this.reviews = data;
      }
    });
  }

  saveReview(): void {
    const session = this.authService.getSession();
    if (!session) {
      return;
    }

    this.teacherService.saveReview({
      attemptId: this.attemptId,
      teacherId: session.userId,
      manualScore: this.reviewForm.value.manualScore ?? null,
      comments: this.reviewForm.value.comments ?? null
    }).subscribe({
      next: () => {
        this.loadAll();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo guardar la revisión.';
      }
    });
  }
}