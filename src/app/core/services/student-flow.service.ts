import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { StudentAttemptResponse } from '../models/simulation.models';

@Injectable({
  providedIn: 'root'
})
export class StudentFlowService {
  constructor(private http: HttpClient) {}

  startOrResume(simulationId: number, studentId: number): Observable<StudentAttemptResponse> {
    return this.http.post<StudentAttemptResponse>(`${API_BASE_URL}/student-simulation-flow/start`, {
      simulationId,
      studentId
    });
  }

  getAttempt(attemptId: number): Observable<StudentAttemptResponse> {
    return this.http.get<StudentAttemptResponse>(
      `${API_BASE_URL}/student-simulation-flow/attempts/${attemptId}`
    );
  }

  findAttemptsByStudent(studentId: number): Observable<StudentAttemptResponse[]> {
    return this.http.get<StudentAttemptResponse[]>(
      `${API_BASE_URL}/student-simulation-flow/students/${studentId}/attempts`
    );
  }

  answer(attemptId: number, optionId: number): Observable<StudentAttemptResponse> {
    return this.http.post<StudentAttemptResponse>(
      `${API_BASE_URL}/student-simulation-flow/attempts/${attemptId}/answer`,
      { optionId }
    );
  }

  continueNode(attemptId: number): Observable<StudentAttemptResponse> {
    return this.http.post<StudentAttemptResponse>(
      `${API_BASE_URL}/student-simulation-flow/attempts/${attemptId}/continue`,
      {}
    );
  }
}