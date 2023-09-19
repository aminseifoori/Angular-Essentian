import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { Movie } from 'src/app/shared/Interface/movie.model';
import { AuthenticatedResponse } from '../Interface/authenticated-response';
import { LoginModel } from '../Interface/login-model';


@Injectable({
  providedIn: 'root'
})
export class MoviesRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getMovies = () => {

    return this.http.get<Movie[]>(`${this.envUrl.apiURL}/api/movies`, this.generateHeaders());
  }

  public getMovie = (id : string) => {
    return this.http.get<Movie>(`${this.envUrl.apiURL}/api/movies/` + id, this.generateHeaders());
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
