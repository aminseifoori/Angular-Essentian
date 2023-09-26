import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MovieUpdateModel } from 'src/app/shared/Interface/movie-update.model';
import { Movie } from 'src/app/shared/Interface/movie.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MoviesRepositoryService } from 'src/app/shared/services/movies-repository.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {
  movie: Movie;
  movieForm: FormGroup;
  bsModalRef?: BsModalRef;
  constructor(private repository: MoviesRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      releaseDate: new FormControl('', [Validators.required]),
    });
    this.getOwnerById();
  }

  private getOwnerById = () => {
    const movieId: string = this.activeRoute.snapshot.params['id'];
    this.repository.getMovie(movieId)
      .subscribe({
        next: (mov: Movie) => {
          this.movie = {
            ...mov,
            releaseDate: new Date(this.datePipe.transform(mov.releaseDate, 'MM/dd/yyyy'))
          };
          this.movieForm.patchValue(this.movie);
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
  }

  validateControl = (controlName: string) => {
    if (this.movieForm.get(controlName).invalid && this.movieForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.movieForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  public updateMovie = (movieFormValue) => {
    if (this.movieForm.valid){
      const movieForUpdate: MovieUpdateModel = {
        name: movieFormValue.name,
        releaseDate: this.datePipe.transform(movieFormValue.releaseDate, 'yyyy-MM-dd'),
      }
       
      this.repository.updateMovie(movieForUpdate, this.movie.id)
      .subscribe({
        next: (_) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: 'Movie updated successfully',
              okButtonText: 'OK'
            }
          };
    
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToMovieList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
  }

  public redirectToMovieList = () => {
    this.router.navigate(['/movie/list']);
  }
  

}
