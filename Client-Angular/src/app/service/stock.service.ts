// src/app/services/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'https://localhost:7212/api/Stocks';

  constructor(private http: HttpClient) {}

  getStockData(company: string, range: string): Observable<any[]> {
    const url = `${this.baseUrl}/${company}/${range}`;
    return this.http.get<any[]>(url);
  }
}