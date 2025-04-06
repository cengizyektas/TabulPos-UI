import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, switchMap } from 'rxjs';
import { KeycloakService } from './keycloak.service';
import { environment } from 'environments/environment';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  private _keycloakService = inject(KeycloakService);
  private _apiUrl = environment.apiUrl;

  /**
   * Intercept
   * 
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only intercept API requests to your backend
    if (!req.url.startsWith(this._apiUrl)) {
      return next.handle(req);
    }

    // For API requests, add Keycloak token
    return this._keycloakService.getValidToken().pipe(
      switchMap(token => {
        // Clone the request and add the authorization header
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        
        // Forward the modified request
        return next.handle(authReq);
      })
    );
  }
}