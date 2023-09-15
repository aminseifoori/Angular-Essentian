import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/movie.model';
import { MoviesRepositoryService } from 'src/app/shared/services/movies-repository.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  
  movies: Movie[];

  constructor(private repository: MoviesRepositoryService){}

  ngOnInit(): void {
    this.getAllmovies();
  }

  private getAllmovies = () => {
    this.repository.getMovies()
    .subscribe(result => {
      this.movies = result;
    })
  }
}
