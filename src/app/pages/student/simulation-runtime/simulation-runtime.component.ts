import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentFlowService } from '../../../core/services/student-flow.service';
import { StudentAttemptResponse } from '../../../core/models/simulation.models';

@Component({
  selector: 'app-simulation-runtime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulation-runtime.component.html',
  styleUrls: ['./simulation-runtime.component.scss']
})
export class SimulationRuntimeComponent implements OnInit {
  attempt!: StudentAttemptResponse;
  error = '';
  attemptId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentFlowService: StudentFlowService
  ) {}

  ngOnInit(): void {
    this.attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));
    this.loadAttempt();
  }

  loadAttempt(): void {
    this.studentFlowService.getAttempt(this.attemptId).subscribe({
      next: (data) => {
        this.attempt = data;

        if (data.status === 'COMPLETED') {
          this.router.navigate(['/student/result', data.attemptId]);
        }
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo cargar el intento.';
      }
    });
  }

  answer(optionId: number): void {
    this.studentFlowService.answer(this.attemptId, optionId).subscribe({
      next: (data) => {
        this.attempt = data;

        if (data.status === 'COMPLETED') {
          this.router.navigate(['/student/result', data.attemptId]);
        }
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo registrar la respuesta.';
      }
    });
  }

  continueNode(): void {
    this.studentFlowService.continueNode(this.attemptId).subscribe({
      next: (data) => {
        this.attempt = data;

        if (data.status === 'COMPLETED') {
          this.router.navigate(['/student/result', data.attemptId]);
        }
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo continuar el flujo.';
      }
    });
  }
}