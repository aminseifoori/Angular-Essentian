import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CostsComponent } from './movie-details/costs/costs.component';
import { SharedModule } from '../shared/shared.module';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    CostsComponent,
    MovieCreateComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class MovieModule { }
