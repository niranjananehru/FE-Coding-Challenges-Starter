import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, first } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { MovieComplete } from 'src/app/models/data.model';
import { BaseLink } from '../../shared/sidebar/sidebar.component';
import { NavigationService } from '../../shared/navigation/navigation.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movie: MovieComplete;
  public movieId: string | null = '';
  public links: BaseLink[] = [
    {
      label: 'Go Back',
      isActive: true
    }
  ];
  public imdbBaseLink = 'https://www.imdb.com/title/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private navigationService: NavigationService
  ) {}

  public ngOnInit() {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService
      .getMovies()
      .pipe(
        first(),
        tap((data) => {
          const movie = data.Search.find((srch) => srch.imdbID === this.movieId);
          this.movie = movie as MovieComplete;
        })
      )
      .subscribe();
  }

  public navigateTo() {
    this.navigationService.goTo('/');
  }

  public navigateToImdb(id: string) {
    if (id) window.open(this.imdbBaseLink + id, 'imdbWindow');
  }
}
