import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MovieComponent } from './movie.component';
import { DataService } from '../../../services/data.service';
import { of } from 'rxjs';

const mockActivatedRoute = mockProvider(ActivatedRoute, {
  snapshot: {
    paramMap: new Map([['id','tt123']])
  }
});
const mockDecades = [2000];
const mockMovies = [
  {
    Title: 'Mock Movie',
    Year: 2000,
    Rated: 'G',
    Released: '01 Jan 2000',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  },
  {
    Title: 'Mock Movie 2',
    Year: 2011,
    Rated: 'G',
    Released: '01 Jan 2011',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  }
];

const mockGetMovies = jest.fn().mockReturnValue(of({ Decades: mockDecades, Search: mockMovies }));
const mockDataService = mockProvider(DataService, {
  getMovies: mockGetMovies
});

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [mockActivatedRoute, mockDataService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  test('should set the id param from activated route', () => {
    component.ngOnInit();
    expect(component.movieId).toEqual('tt123');
  });

  test('should set the movie based on id', async() => {
    component.ngOnInit();
    expect(component.movie).toBe(mockMovies[0]);
  });
});
