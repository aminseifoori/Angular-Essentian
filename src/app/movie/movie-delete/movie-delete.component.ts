import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Movie } from 'src/app/shared/Interface/movie.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MoviesRepositoryService } from 'src/app/shared/services/movies-repository.service';

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.css']
})
export class MovieDeleteComponent implements OnInit {
  movie: Movie;
  bsModalRef?: BsModalRef;

  constructor(private repository: MoviesRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

  ngOnInit(): void {
    this.getMovieById();
  }
  private getMovieById = () => {
    const movieId: string = this.activeRoute.snapshot.params['id'];

    this.repository.getMovie(movieId)
      .subscribe({
        next: (mov: Movie) => this.movie = mov,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
  }

  redirectToMovieList = () => {
    this.router.navigate(['/movie/list']);
  }

  deleteMovie = () => {
  
    this.repository.deleteMovie(this.movie.id)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner deleted successfully`,
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
