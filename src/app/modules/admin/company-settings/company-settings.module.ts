import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySettingsComponent } from './company-settings.component';
import { LocationModalComponent } from './location-modal/location-modal.component';

@NgModule({
  imports: [
    CommonModule,
    CompanySettingsComponent,
    LocationModalComponent
  ]
})
export class CompanySettingsModule { } 