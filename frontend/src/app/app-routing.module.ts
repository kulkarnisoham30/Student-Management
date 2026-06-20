import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { StudentEditComponent } from './components/student-edit/student-edit.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'edit/:id',
    component: StudentEditComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
