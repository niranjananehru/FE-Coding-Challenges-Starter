import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesSearchRoutingModule } from './movies-search-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MoviesComponent, MovieComponent],
  imports: [MoviesSearchRoutingModule, SharedModule]
})
export class MoviesSearchModule {}
