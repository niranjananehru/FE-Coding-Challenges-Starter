import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, first } from 'rxjs';
import { DataService, MovieComplete } from 'src/app/services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId : string | null = '';

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getMovies().pipe(
      first(),
      tap(data => { 
        const movie = data.Movies.find(srch => srch.imdbID === this.movieId);
        this.movie = movie as MovieComplete;
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
  }
}
