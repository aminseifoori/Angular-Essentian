import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/Interface/movie.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MoviesRepositoryService } from 'src/app/shared/services/movies-repository.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  
  movies: Movie[];
  errorMessage: string = '';

  constructor(private repository: MoviesRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router){}

  ngOnInit(): void {
    this.getAllmovies();
  }

  private getAllmovies = () => {
    this.repository.getMovies()
    .subscribe({
      next: (result: Movie[]) => {
        this.movies = result;
      },
      error: (err: HttpErrorResponse) =>{
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }

  private getMovieDetail = (id) =>{
    const detailsUrl: string = `/movie/detail/${id}`; 
    this.router.navigate([detailsUrl]); 
  }
}
