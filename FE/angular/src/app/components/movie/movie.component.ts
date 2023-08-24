import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete | undefined;
  public movieId : string | null = '';
  private movieSubscription: any;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieSubscription = this.dataService.getMovies().pipe(
      tap(movies => { 
        this.movie = movies.Search.find(srch => srch.imdbID === this.movieId);
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
