import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { SimulationResponse } from '../models/simulation.models';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<SimulationResponse[]> {
    return this.http.get<SimulationResponse[]>(`${API_BASE_URL}/simulations`);
  }
}