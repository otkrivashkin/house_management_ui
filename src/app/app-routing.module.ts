import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HouseTablePageComponent } from './pages/house/house-table-page/house-table-page.component';
import { UserTablePageComponent } from './pages/user/user-table-page/user-table-page.component';
import { SkillTablePageComponent } from './pages/skill/skill-table-page/skill-table-page.component';
import { HouseFeatureTablePageComponent } from './pages/house-feature/house-feature-table-page/house-feature-table-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'houses'
  },
  {
    path: 'houses',
    component: HouseTablePageComponent,
  },
  {
    path: 'users',
    component: UserTablePageComponent
  },
  {
    path: 'skills',
    component: SkillTablePageComponent
  },
  {
    path: 'features',
    component: HouseFeatureTablePageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
