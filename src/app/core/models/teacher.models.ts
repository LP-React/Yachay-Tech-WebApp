export interface TeacherAttemptSummaryResponse {
  attemptId: number;
  simulationId: number;
  simulationCode: string;
  simulationTitle: string;
  courseId: number;
  courseCode: string;
  courseName: string;
  studentId: number;
  studentFullName: string;
  studentEmail: string;
  status: string;
  totalScore: number;
  startedAt: string;
  completedAt: string | null;
  finalResultLevelCode: string | null;
  finalResultTitle: string | null;
}

export interface TeacherAttemptDetailResponse {
  attemptId: number;
  simulationId: number;
  simulationCode: string;
  simulationTitle: string;
  courseId: number;
  courseCode: string;
  courseName: string;
  studentId: number;
  studentFullName: string;
  studentEmail: string;
  status: string;
  totalScore: number;
  startedAt: string;
  completedAt: string | null;
  currentNodeCode: string | null;
  currentNodeTitle: string | null;
  finalResultLevelId: number | null;
  finalResultLevelCode: string | null;
  finalResultTitle: string | null;
  finalFeedbackText: string | null;
  companyResponseText: string | null;
}

export interface AttemptStepTraceResponse {
  stepId: number;
  stepNumber: number;
  phaseId: number | null;
  phaseTitle: string | null;
  nodeId: number | null;
  nodeCode: string | null;
  nodeTitleSnapshot: string | null;
  optionId: number | null;
  optionCode: string | null;
  optionTextSnapshot: string | null;
  nextNodeId: number | null;
  nextNodeCode: string | null;
  nextNodeTitle: string | null;
  scoreAwarded: number;
  feedbackSnapshot: string | null;
  decisionTakenAt: string;
}

export interface AttemptReviewRequest {
  attemptId: number;
  teacherId: number;
  manualScore?: number | null;
  comments?: string | null;
}

export interface AttemptReviewResponse {
  id: number;
  attemptId: number;
  teacherId: number;
  teacherFullName: string;
  teacherEmail: string;
  manualScore: number | null;
  comments: string | null;
  reviewedAt: string;
  createdAt?: string;
  updatedAt?: string;
}