import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { ApiResponse } from 'app/services/firma.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { User } from '../user/user.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private _testToken = inject(AuthMockApi);
    private _apiService = inject(ApiService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set phoneNumber(token: string) {
        localStorage.setItem('phoneNumber', token);
    }

    get phoneNumber(): string {
        return localStorage.getItem('phoneNumber') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError(() => 'User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._apiService
            .get<ApiResponse<User>>(`User/GetUserByPhone/${this.phoneNumber}`)
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    // if (response.accessToken) {
                    //     this.accessToken = response.accessToken;
                    // }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.data;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**Sayfa yuklenirken token kontrolü yapar
     * daha sonra düzenle şimdilik bir önenmi yok
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // token gelirse ve geçerli ise kontorol et
        if (!this.accessToken) {
            return of(false);
        }
        // token gelirse ve geçerli ise kontorol et
        if (!this.phoneNumber) {
            return of(false);
        }

        // token süresi dolmuş mu
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    /**
     * Sign in with phone number
     *
     * @param credentials
     */
    signInWithPhone(credentials: {
        phoneNumber: string;
        password: string;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError(() => 'User is already logged in.');
        }

        return this._httpClient
            .post('http://localhost:35029/v1/Auth/Login', credentials)
            .pipe(
                switchMap((response: any) => {
                    if (response.status === 200 && response.data) {
                        this.accessToken =
                            this._testToken._generateJWTToken() || '';

                        this._authenticated = true;
                        this.phoneNumber = credentials.phoneNumber;

                        this._userService.user = response.data;
                        return of(response);
                    }

                    return throwError(
                        () => response.messages || 'Authentication failed'
                    );
                })
            );
    }
}
