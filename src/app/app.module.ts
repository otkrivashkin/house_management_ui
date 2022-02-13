import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HouseTablePageComponent } from './pages/house/house-table-page/house-table-page.component';
import { HouseFormPageComponent } from './pages/house/house-form-page/house-form-page.component';
import { UserTablePageComponent } from './pages/user/user-table-page/user-table-page.component';
import { UserFormPageComponent } from './pages/user/user-form-page/user-form-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { SkillTablePageComponent } from './pages/skill/skill-table-page/skill-table-page.component';
import { SkillFormPageComponent } from './pages/skill/skill-form-page/skill-form-page.component';
import { HouseFeatureTablePageComponent } from './pages/house-feature/house-feature-table-page/house-feature-table-page.component';
import { HouseFeatureFormPageComponent } from './pages/house-feature/house-feature-form-page/house-feature-form-page.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AuthPageComponent,
    AppComponent,
    BaseLayoutComponent,
    NotFoundPageComponent,
    SidebarComponent,
    HeaderComponent,
    HouseTablePageComponent,
    HouseFormPageComponent,
    UserTablePageComponent,
    UserFormPageComponent,
    SkillTablePageComponent,
    SkillFormPageComponent,
    HouseFeatureTablePageComponent,
    HouseFeatureFormPageComponent,
    EnumToArrayPipe
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
