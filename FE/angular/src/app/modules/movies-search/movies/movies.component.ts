import { Component, OnInit } from '@angular/core';
import { tap, first } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { MovieComplete } from 'src/app/models/data.model';
import { NavigationService } from '../../shared/navigation/navigation.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];

  constructor(private dataService: DataService, private navigationService: NavigationService) {}

  public ngOnInit(): void {
    this.dataService
      .getMovies()
      .pipe(
        first(),
        tap((data) => {
          this.decades = data.Decades;
          this.movies = data.Search;
          this.displayMovies();
        })
      )
      .subscribe();
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }

    this.currDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }

  public navigateToMovieDetail(id: string) {
    this.navigationService.goTo('/movie', id);
  }
}
