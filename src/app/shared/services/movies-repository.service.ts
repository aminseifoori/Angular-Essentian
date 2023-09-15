import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { Movie } from 'src/app/interface/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getMovies = () => {
    return this.http.get<Movie[]>(`${this.envUrl.apiURL}/api/movies`);
  }

  public createMovie = (movie: Movie) => {
    return this.http.post<Movie>(`${this.envUrl.apiURL}/api/movies`, movie, this.generateHeaders());
  }

  public updateMovie = (movie: Movie) => {
    return this.http.put(`${this.envUrl.apiURL}/api/movies`, movie, this.generateHeaders());
  }

  public deleteMovie = () => {
    return this.http.delete(`${this.envUrl.apiURL}/api/movies`);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
