import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DecadesComponent } from './navigation/decades/decades.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SidebarComponent, DecadesComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, DecadesComponent, CommonModule]
})
export class SharedModule {}
