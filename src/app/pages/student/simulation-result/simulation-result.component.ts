import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentFlowService } from '../../../core/services/student-flow.service';
import { StudentAttemptResponse } from '../../../core/models/simulation.models';

@Component({
  selector: 'app-simulation-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './simulation-result.component.html',
  styleUrls: ['./simulation-result.component.scss']
})
export class SimulationResultComponent implements OnInit {
  attempt!: StudentAttemptResponse;

  constructor(
    private route: ActivatedRoute,
    private studentFlowService: StudentFlowService
  ) {}

  ngOnInit(): void {
    const attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));

    this.studentFlowService.getAttempt(attemptId).subscribe({
      next: (data) => {
        this.attempt = data;
      }
    });
  }
}