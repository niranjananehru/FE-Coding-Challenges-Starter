import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GoBackComponent } from './navigation/go-back/go-back.component';
import { GoDetailsComponent } from './navigation/go-details/go-details.component';
import { GoImdbComponent } from './navigation/go-imdb/go-imdb.component';
import { DecadesComponent } from './navigation/decades/decades.component';

@NgModule({
    declarations: [
        SidebarComponent,
        GoBackComponent,
        GoDetailsComponent,
        GoImdbComponent,
        DecadesComponent
    ],
    exports: [
        SidebarComponent,
        GoBackComponent,
        GoDetailsComponent,
        GoImdbComponent,
        DecadesComponent
    ]
})
export class SharedModule {}