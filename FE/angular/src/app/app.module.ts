import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { MoviesSearchModule } from './modules/movies-search/movies-search.module';
import { SharedModule } from './modules/shared/shared.module';
import { NavigationService } from './modules/shared/navigation/navigation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,SharedModule,MoviesSearchModule],
  providers: [DataService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
