import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { CourseEnrollmentResponse } from '../models/course-enrollment.models';

@Injectable({
  providedIn: 'root'
})
export class CourseEnrollmentService {
  constructor(private http: HttpClient) {}

  findByUserId(userId: number): Observable<CourseEnrollmentResponse[]> {
    return this.http.get<CourseEnrollmentResponse[]>(
      `${API_BASE_URL}/enrollments/user/${userId}`
    );
  }
}