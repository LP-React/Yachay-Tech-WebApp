import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  success = '';
  error = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      institutionalCode: [''],
      phone: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.success = '';
    this.error = '';

    const request = {
      names: this.form.value.names ?? '',
      lastNames: this.form.value.lastNames ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      institutionalCode: this.form.value.institutionalCode ?? null,
      phone: this.form.value.phone ?? null
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Registro correcto. Ahora inicia sesión.';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'No se pudo registrar el estudiante.';
      }
    });
  }
}