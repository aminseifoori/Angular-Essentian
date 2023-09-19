import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/shared/Interface/movie.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MoviesRepositoryService } from 'src/app/shared/services/movies-repository.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  errorMessage: string = '';

  constructor(private repository: MoviesRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getMovieDetails()
  }

  getMovieDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];

    this.repository.getMovie(id)
    .subscribe({
      next: (result: Movie) => this.movie = result,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }
}
