import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: "search",
    component: SearchComponent
  },
  {
    path:"aboutUs",
    component:AboutUsComponent
  }
 
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
