import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MovieCreateModel } from 'src/app/shared/Interface/movie-create.model';
import { Movie } from 'src/app/shared/Interface/movie.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MoviesRepositoryService } from 'src/app/shared/services/movies-repository.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  errorMessage: string = '';
  movieForm: FormGroup;
  bsModalRef?: BsModalRef;
  
  constructor(private repository: MoviesRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      releaseDate: new FormControl(''),
    });
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

  redirectToMovieList = () => {
    this.router.navigate(['/movie/list']);
  }

  createMovie = (movieFormValue) => {
    if (this.movieForm.valid){
      const movie: MovieCreateModel = {
        name: movieFormValue.name,
        releaseDate: this.datePipe.transform(movieFormValue.releaseDate, 'yyyy-MM-dd'),
      }

      this.repository.createMovie(movie)
      .subscribe({
        next: (result: Movie) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: `Movie: ${movie.name} created successfully`,
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToMovieList());
        },
        error: (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        }
      });
    }
  }

}
