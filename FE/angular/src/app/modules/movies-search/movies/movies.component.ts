import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap, first, Observable } from 'rxjs';
import { DataService, MovieComplete } from 'src/app/services/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService.getMovies().pipe(
      first(),
      tap((data) => {
        this.decades = data.Decades;
        this.movies = data.Movies;
        this.displayMovies();
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }

    this.currDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }
}
