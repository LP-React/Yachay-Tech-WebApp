import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { SimulationListComponent } from './pages/student/simulation-list/simulation-list.component';
import { SimulationRuntimeComponent } from './pages/student/simulation-runtime/simulation-runtime.component';
import { SimulationResultComponent } from './pages/student/simulation-result/simulation-result.component';
import { TeacherAttemptListComponent } from './pages/teacher/attempt-list/attempt-list.component';
import { TeacherAttemptDetailComponent } from './pages/teacher/attempt-detail/attempt-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'student/simulations', component: SimulationListComponent },
  { path: 'student/runtime/:attemptId', component: SimulationRuntimeComponent },
  { path: 'student/result/:attemptId', component: SimulationResultComponent },

  { path: 'teacher/attempts', component: TeacherAttemptListComponent },
  { path: 'teacher/attempts/:attemptId', component: TeacherAttemptDetailComponent },

  { path: '**', redirectTo: 'login' }
];