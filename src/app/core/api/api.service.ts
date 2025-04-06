import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _httpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;

  /**
   * Constructor
   */
  constructor() {
    // Constructor
  }

  /**
   * Generic GET method
   * 
   * @param endpoint API endpoint path
   * @param params Optional query parameters
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this._httpClient.get<T>(`${this._apiUrl}/${endpoint}`, { params });
  }

  /**
   * Generic POST method
   * 
   * @param endpoint API endpoint path
   * @param data Request body
   * @param params Optional query parameters
   */
  post<T>(endpoint: string, data: any, params?: any): Observable<T> {
    return this._httpClient.post<T>(`${this._apiUrl}/${endpoint}`, data, { params });
  }

  /**
   * Generic PUT method
   * 
   * @param endpoint API endpoint path
   * @param data Request body
   * @param params Optional query parameters
   */
  put<T>(endpoint: string, data: any, params?: any): Observable<T> {
    return this._httpClient.put<T>(`${this._apiUrl}/${endpoint}`, data, { params });
  }

  /**
   * Generic DELETE method
   * 
   * @param endpoint API endpoint path
   * @param params Optional query parameters
   */
  delete<T>(endpoint: string, params?: any): Observable<T> {
    return this._httpClient.delete<T>(`${this._apiUrl}/${endpoint}`, { params });
  }
} 