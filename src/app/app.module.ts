import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { ServicesComponent } from "./components/services/services.component";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { CabinetComponent } from "./components/cabinet/cabinet.component";
import { ProjectComponent } from "./components/project/project.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { PopupComponent } from "./components/popup/popup.component";
import { UserComponent } from "./components/cabinet/user/user.component";
import { UserCompanyComponent } from "./components/cabinet/user-company/user-company.component";
import { UserProjectsComponent } from "./components/cabinet/user-projects/user-projects.component";
import { AngularYandexMapsModule } from "angular8-yandex-maps";
import { InputWidthDirective } from "./directives/input-width.directive";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule, MatRadioModule, MatSliderModule } from "@angular/material";
import { RestorePasswordComponent } from "./components/login/password-restore/restore-password/restore-password.component";
import { CreatePasswordComponent } from "./components/login/password-restore/create-password/create-password.component";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { UserInfoComponent } from "./components/user-info/user-info.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ServicesComponent,
    NotFoundComponent,
    ProjectsComponent,
    ContactsComponent,
    LoginComponent,
    RegistrationComponent,
    CabinetComponent,
    ProjectComponent,
    PopupComponent,
    UserComponent,
    UserCompanyComponent,
    UserProjectsComponent,
    InputWidthDirective,
    RestorePasswordComponent,
    CreatePasswordComponent,
    RestorePasswordComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularYandexMapsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders,
              {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
