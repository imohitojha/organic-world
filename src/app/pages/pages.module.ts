import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';


//  Declare all the components in this module
@NgModule({
  declarations: [
    HeaderComponent
  ],
  providers: [],
  imports: [
    PagesRoutingModule,
    FormsModule
  ],
})
export class PagesModule {}
