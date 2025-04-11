import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { Observable } from 'rxjs';
import { RegisterRestaurantRequest, RegisterRestaurantResponse } from './restaurant.types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  /**
   * Constructor
   */
  constructor(private _apiService: ApiService) { }

  /**
   * Register a new restaurant
   * 
   * @param registerData The restaurant registration data
   */
  registerRestaurant(registerData: RegisterRestaurantRequest): Observable<RegisterRestaurantResponse> {
    return this._apiService.post<RegisterRestaurantResponse>('Restaurant/RegisterRestaurant', registerData);
  }
} 