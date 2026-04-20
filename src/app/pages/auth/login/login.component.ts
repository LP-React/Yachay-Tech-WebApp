import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;

  emailErrorMessage = '';
  passwordErrorMessage = '';
  generalErrorMessage = '';

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.clearServerErrors();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const loginRequest = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authService.login(loginRequest).subscribe({
      next: (loginResponse) => {
        this.loading = false;

        if (loginResponse.roleCode === 'ESTUDIANTE') {
          this.router.navigate(['/student/simulations']);
          return;
        }

        if (loginResponse.roleCode === 'DOCENTE') {
          this.router.navigate(['/teacher/attempts']);
          return;
        }

        this.generalErrorMessage = 'El frontend actual solo contempla ESTUDIANTE y DOCENTE.';
      },
      error: (errorResponse) => {
        this.loading = false;

        const backendMessage = errorResponse?.error?.message ?? '';

        if (backendMessage === 'Correo incorrecto') {
          this.emailErrorMessage = 'Correo incorrecto';
          return;
        }

        if (backendMessage === 'Contraseña incorrecta') {
          this.passwordErrorMessage = 'Contraseña incorrecta';
          return;
        }

        this.generalErrorMessage = backendMessage || 'No se pudo iniciar sesión.';
      }
    });
  }

  clearServerErrors(): void {
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    this.generalErrorMessage = '';
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}