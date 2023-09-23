import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CostsComponent } from './movie-details/costs/costs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    CostsComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule
  ]
})
export class MovieModule { }
