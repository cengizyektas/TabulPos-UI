import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_expires_in?: number;
  token_type: string;
  scope?: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _httpClient = inject(HttpClient);
  private _tokenInfo: KeycloakTokenResponse | null = null;
  private _tokenExpirationTime: number | null = null;

  // Keycloak configuration
  private _clientId = environment.keycloak.clientId;
  private _clientSecret = environment.keycloak.clientSecret;
  private _keycloakUrl = environment.keycloak.url;
  private _realm = environment.keycloak.realm;

  // Token storage keys
  private _accessTokenKey = 'keycloak_access_token';
  private _tokenExpirationKey = 'keycloak_token_expiration';

  /**
   * Constructor
   */
  constructor() {
    // Load token from storage if available
    this._loadTokenFromStorage();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get access token
   */
  get accessToken(): string | null {
    return this._tokenInfo?.access_token || null;
  }

  /**
   * Check if token is valid
   */
  get isTokenValid(): boolean {
    if (!this._tokenInfo || !this._tokenExpirationTime) {
      return false;
    }

    return Date.now() < this._tokenExpirationTime;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get valid token (requests a new one if expired)
   */
  getValidToken(): Observable<string> {
    // If token is valid, return it
    if (this.isTokenValid) {
      return of(this._tokenInfo!.access_token);
    }

    // Otherwise, request a new token
    return this.getClientCredentialsToken();
  }

  /**
   * Get token using client credentials flow
   */
  getClientCredentialsToken(): Observable<string> {
    const tokenEndpoint = `${this._keycloakUrl}/realms/${this._realm}/protocol/openid-connect/token`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this._clientId)
      .set('client_secret', this._clientSecret);

    return this._httpClient.post<KeycloakTokenResponse>(tokenEndpoint, body.toString(), { headers })
      .pipe(
        tap((response) => {
          this._tokenInfo = response;
          
          // Calculate expiration time (with 60 seconds buffer)
          const expiresInMs = (response.expires_in - 60) * 1000;
          this._tokenExpirationTime = Date.now() + expiresInMs;
          
          // Store token info
          this._saveTokenToStorage();
        }),
        map(response => response.access_token),
        catchError(error => {
          console.error('Error getting Keycloak token:', error);
          return throwError(() => 'Failed to get Keycloak token');
        })
      );
  }

  /**
   * Clear token
   * This only removes Keycloak-specific tokens, not affecting user authentication
   */
  clearToken(): void {
    this._tokenInfo = null;
    this._tokenExpirationTime = null;
    localStorage.removeItem(this._accessTokenKey); // Only removes 'keycloak_access_token'
    localStorage.removeItem(this._tokenExpirationKey); // Only removes 'keycloak_token_expiration'
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Save token to storage
   */
  private _saveTokenToStorage(): void {
    if (this._tokenInfo && this._tokenExpirationTime) {
      localStorage.setItem(this._accessTokenKey, JSON.stringify(this._tokenInfo));
      localStorage.setItem(this._tokenExpirationKey, this._tokenExpirationTime.toString());
    }
  }

  /**
   * Load token from storage
   */
  private _loadTokenFromStorage(): void {
    const tokenInfo = localStorage.getItem(this._accessTokenKey);
    const expirationTime = localStorage.getItem(this._tokenExpirationKey);

    if (tokenInfo && expirationTime) {
      this._tokenInfo = JSON.parse(tokenInfo);
      this._tokenExpirationTime = parseInt(expirationTime, 10);

      // Check if token is still valid
      if (!this.isTokenValid) {
        this.clearToken();
      }
    }
  }
} 