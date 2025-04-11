import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { RestaurantService } from './restaurant.service';
import { RegisterRestaurantRequest } from './restaurant.types';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSelectModule,
    ],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    countryCode: string = '+90';

    /**
     * Constructor
     */
    constructor(
        private _restaurantService: RestaurantService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            company: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            agreements: [false, Validators.requiredTrue],
        }, {
            validators: this.passwordMatchValidator
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Password match validator
     */
    private passwordMatchValidator(formGroup: UntypedFormGroup): { [key: string]: boolean } | null {
        const password = formGroup.get('password').value;
        const passwordConfirm = formGroup.get('passwordConfirm').value;

        return password === passwordConfirm ? null : { passwordMismatch: true };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            // Mark all fields as touched to display validation errors
            this.signUpForm.markAllAsTouched();
            
            // Set alert message if password doesn't match
            if (this.signUpForm.hasError('passwordMismatch')) {
                this.alert = {
                    type: 'error',
                    message: 'Şifreler eşleşmiyor. Lütfen kontrol ediniz.',
                };
                this.showAlert = true;
            }
            
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Format the phone number with the country code
        const phoneNumber = this.signUpForm.get('phone').value;
        const formattedPhoneNumber = phoneNumber.startsWith('+90') ? 
            phoneNumber : 
            phoneNumber.startsWith('0') ? 
                `+9${phoneNumber}` : 
                `+90${phoneNumber}`;

        // Prepare request data
        const registerData: RegisterRestaurantRequest = {
            İşletmeAdı: this.signUpForm.get('company').value,
            İsimSoyisim: this.signUpForm.get('name').value,
            güncelMailAdresiniz: this.signUpForm.get('email').value,
            cepTelefonu: formattedPhoneNumber,
            şifre: this.signUpForm.get('password').value,
            şifreTekrar: this.signUpForm.get('passwordConfirm').value,
            kullanımSözleşmesini: this.signUpForm.get('agreements').value,
        };

        // Register restaurant
        this._restaurantService.registerRestaurant(registerData).subscribe(
            (response) => {
                if (response.success) {
                    // Navigate to the main dashboard
                    this._router.navigateByUrl('/app/dashboard');
                } else {
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.message || 'Kayıt sırasında bir hata oluştu.',
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            },
            (error) => {
                // Re-enable the form
                this.signUpForm.enable();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: error.error?.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
}
