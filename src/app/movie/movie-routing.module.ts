import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MovieDeleteComponent } from './movie-delete/movie-delete.component';

const routes: Routes = [
  { path: 'list', component: MovieListComponent},
  { path: 'detail/:id', component: MovieDetailsComponent},
  { path: 'create', component: MovieCreateComponent},
  { path: 'update/:id', component: MovieUpdateComponent},
  { path: 'delete/:id', component: MovieDeleteComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
