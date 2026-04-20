import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { SimulationService } from '../../../core/services/simulation.service';
import { StudentFlowService } from '../../../core/services/student-flow.service';
import { CourseEnrollmentService } from '../../../core/services/course-enrollment.service';

import { LoginResponse } from '../../../core/models/auth.models';
import { SimulationResponse, StudentAttemptResponse } from '../../../core/models/simulation.models';
import { CourseEnrollmentResponse } from '../../../core/models/course-enrollment.models';

@Component({
  selector: 'app-simulation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss']
})
export class SimulationListComponent implements OnInit {
  errorMessage = '';

  currentSession: LoginResponse | null = null;
  isUserMenuOpen = false;
  activeSection: 'inicio' | 'progreso' | 'historial' = 'inicio';

  courseEnrollments: CourseEnrollmentResponse[] = [];
  availableSimulations: SimulationResponse[] = [];
  studentAttempts: StudentAttemptResponse[] = [];
  enrolledSimulations: SimulationResponse[] = [];
  currentInProgressAttempt: StudentAttemptResponse | null = null;

  constructor(
    private authService: AuthService,
    private simulationService: SimulationService,
    private studentFlowService: StudentFlowService,
    private courseEnrollmentService: CourseEnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentSession = this.authService.getSession();

    if (!this.currentSession || this.currentSession.roleCode !== 'ESTUDIANTE') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadStudentDashboard();
  }

  loadStudentDashboard(): void {
    if (!this.currentSession) {
      return;
    }

    this.errorMessage = '';

    forkJoin({
      simulationList: this.simulationService.findAll(),
      enrollmentList: this.courseEnrollmentService.findByUserId(this.currentSession.userId),
      attemptList: this.studentFlowService.findAttemptsByStudent(this.currentSession.userId)
    }).subscribe({
      next: ({ simulationList, enrollmentList, attemptList }) => {
        this.availableSimulations = simulationList.filter(
          (simulationItem) => simulationItem.isActive
        );

        this.courseEnrollments = enrollmentList.filter(
          (enrollmentItem) =>
            enrollmentItem.isActive &&
            enrollmentItem.courseRole === 'ESTUDIANTE'
        );

        this.studentAttempts = attemptList;

        const enrolledCourseIds = new Set(
          this.courseEnrollments.map((enrollmentItem) => enrollmentItem.courseId)
        );

        this.enrolledSimulations = this.availableSimulations.filter(
          (simulationItem) => enrolledCourseIds.has(simulationItem.courseId)
        );

        this.currentInProgressAttempt =
          this.studentAttempts.find(
            (attemptItem) => attemptItem.status === 'IN_PROGRESS'
          ) ?? null;
      },
      error: (errorResponse) => {
        this.errorMessage =
          errorResponse?.error?.message ?? 'No se pudo cargar el panel del estudiante.';
      }
    });
  }

  setSection(section: 'inicio' | 'progreso' | 'historial'): void {
    this.activeSection = section;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  startSimulation(simulation: SimulationResponse): void {
    if (!this.currentSession) {
      this.router.navigate(['/login']);
      return;
    }

    this.studentFlowService
      .startOrResume(simulation.id, this.currentSession.userId)
      .subscribe({
        next: (attemptResponse) => {
          this.router.navigate(['/student/runtime', attemptResponse.attemptId]);
        },
        error: (errorResponse) => {
          this.errorMessage =
            errorResponse?.error?.message ?? 'No se pudo iniciar o retomar la simulación.';
        }
      });
  }

  resumeCurrentAttempt(): void {
    if (!this.currentInProgressAttempt) {
      return;
    }

    this.router.navigate(['/student/runtime', this.currentInProgressAttempt.attemptId]);
  }

  openAttempt(attempt: StudentAttemptResponse): void {
    if (attempt.status === 'COMPLETED') {
      this.router.navigate(['/student/result', attempt.attemptId]);
      return;
    }

    this.router.navigate(['/student/runtime', attempt.attemptId]);
  }

  get currentSimulation(): SimulationResponse | undefined {
    const currentAttempt = this.currentInProgressAttempt;

    if (!currentAttempt) {
      return undefined;
    }

    return this.enrolledSimulations.find(
      (simulationItem) => simulationItem.id === currentAttempt.simulationId
    );
  }

  get completedAttemptsCount(): number {
    return this.studentAttempts.filter(
      (attemptItem) => attemptItem.status === 'COMPLETED'
    ).length;
  }

  get startedAttemptsCount(): number {
    return this.studentAttempts.length;
  }

  get bestScore(): number {
    if (this.studentAttempts.length === 0) {
      return 0;
    }

    return Math.max(
      ...this.studentAttempts.map((attemptItem) => attemptItem.totalScore ?? 0)
    );
  }

  get enrolledCoursesCount(): number {
    return this.courseEnrollments.length;
  }

  get enrolledSimulationsCount(): number {
    return this.enrolledSimulations.length;
  }
}