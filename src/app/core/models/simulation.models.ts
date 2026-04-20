export interface SimulationResponse {
  id: number;
  courseId: number;
  courseCode: string;
  courseName: string;
  code: string;
  title: string;
  description: string;
  version: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SimulationRuntimeOptionResponse {
  optionId: number;
  optionCode: string;
  optionText: string;
  optionDescription: string;
  displayOrder: number;
}

export interface SimulationRuntimeNodeResponse {
  nodeId: number;
  phaseId: number | null;
  phaseCode: string | null;
  phaseTitle: string | null;
  nodeCode: string;
  title: string;
  nodeType: string;
  promptText: string;
  contentText: string;
  shuffleOptions: boolean;
  isFinalNode: boolean;
  options: SimulationRuntimeOptionResponse[];
}

export interface StudentAttemptResponse {
  attemptId: number;
  simulationId: number;
  simulationCode: string;
  simulationTitle: string;
  studentId: number;
  studentFullName: string;
  status: string;
  totalScore: number;
  startedAt: string;
  completedAt: string | null;
  finalResultLevelId: number | null;
  finalResultLevelCode: string | null;
  finalResultTitle: string | null;
  finalFeedbackText: string | null;
  companyResponseText: string | null;
  currentNode: SimulationRuntimeNodeResponse | null;
}