import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RoutingModule } from './routing/routing.module';
import { SharedModule } from './shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
