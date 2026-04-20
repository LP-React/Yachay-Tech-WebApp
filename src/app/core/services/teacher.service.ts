import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import {
  AttemptReviewRequest,
  AttemptReviewResponse,
  AttemptStepTraceResponse,
  TeacherAttemptDetailResponse,
  TeacherAttemptSummaryResponse
} from '../models/teacher.models';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  findAttemptsByCourse(courseId: number, teacherId: number): Observable<TeacherAttemptSummaryResponse[]> {
    return this.http.get<TeacherAttemptSummaryResponse[]>(
      `${API_BASE_URL}/consultation/courses/${courseId}/attempts?teacherId=${teacherId}`
    );
  }

  findAttemptsBySimulation(simulationId: number, teacherId: number): Observable<TeacherAttemptSummaryResponse[]> {
    return this.http.get<TeacherAttemptSummaryResponse[]>(
      `${API_BASE_URL}/consultation/simulations/${simulationId}/attempts?teacherId=${teacherId}`
    );
  }

  getAttemptDetail(attemptId: number, teacherId: number): Observable<TeacherAttemptDetailResponse> {
    return this.http.get<TeacherAttemptDetailResponse>(
      `${API_BASE_URL}/consultation/attempts/${attemptId}?teacherId=${teacherId}`
    );
  }

  getAttemptTrace(attemptId: number, teacherId: number): Observable<AttemptStepTraceResponse[]> {
    return this.http.get<AttemptStepTraceResponse[]>(
      `${API_BASE_URL}/consultation/attempts/${attemptId}/trace?teacherId=${teacherId}`
    );
  }

  getAttemptReviews(attemptId: number, teacherId: number): Observable<AttemptReviewResponse[]> {
    return this.http.get<AttemptReviewResponse[]>(
      `${API_BASE_URL}/consultation/attempts/${attemptId}/reviews?teacherId=${teacherId}`
    );
  }

  findReviewsByTeacher(teacherId: number): Observable<AttemptReviewResponse[]> {
    return this.http.get<AttemptReviewResponse[]>(
      `${API_BASE_URL}/consultation/teachers/${teacherId}/reviews`
    );
  }

  saveReview(request: AttemptReviewRequest): Observable<AttemptReviewResponse> {
    return this.http.post<AttemptReviewResponse>(
      `${API_BASE_URL}/consultation/reviews`,
      request
    );
  }
}