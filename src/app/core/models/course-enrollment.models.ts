export interface CourseEnrollmentResponse {
  id: number;
  courseId: number;
  courseCode: string;
  courseName: string;
  userId: number;
  userFullName: string;
  userEmail: string;
  roleId: number;
  systemRoleCode: string;
  systemRoleName: string;
  courseRole: string;
  isActive: boolean;
  enrolledAt: string;
  createdAt?: string;
  updatedAt?: string;
}