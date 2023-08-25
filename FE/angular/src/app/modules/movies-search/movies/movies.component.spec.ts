import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { DataService } from '../../../services/data.service';
import { async } from '@angular/core/testing';

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
const mockGetFilteredMovies = jest.fn().mockReturnValue([mockMovies[0]]);
const mockDataService = mockProvider(DataService, {
  getMovies: mockGetMovies,
  getFilteredMovies: mockGetFilteredMovies
});

describe('MovieComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    providers: [mockDataService],
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

  describe('ngOnInit', () => {
    beforeEach(async() => {
      component.ngOnInit();
    });
    test('should set decades', () => {
      expect(component.decades).toEqual(mockDecades);
    });
    /*test('should set movies array', () => {
      expect(component.movies).toEqual(mockMovies);
    });*/
  });

  test('should set filteredMovies when movies are defined', () => {
    component.movies = mockMovies;
    component.displayMovies();
    expect(component.filteredMovies).toEqual([mockMovies[0]]);
  });

  test('should set decades when decade is passed', () => {
    component.movies = mockMovies;
    component.displayMovies(2000);
    expect(component.currDecade).toEqual(2000);
  });

  test('should set filteredMovies to an empty array', () => {
    component.movies = [];
    component.displayMovies();
    expect(component.filteredMovies).toEqual([]);
  });

});
