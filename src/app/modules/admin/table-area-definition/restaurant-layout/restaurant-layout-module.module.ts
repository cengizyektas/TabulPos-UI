import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RestaurantLayoutComponent } from './restaurant-layout.component';

@NgModule({
  declarations: [
    RestaurantLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularDraggableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    RestaurantLayoutComponent
  ]
})
export class RestaurantLayoutModule { }