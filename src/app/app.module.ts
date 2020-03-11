import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from "./about/about.component";
import { ServicesComponent } from "./services/services.component";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { CabinetComponent } from "./cabinet/cabinet.component";
import { ProjectComponent } from "./project/project.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { PopupComponent } from "./popup/popup.component";
import { UserComponent } from "./cabinet/user/user.component";
import { UserCompanyComponent } from "./cabinet/user-company/user-company.component";
import { UserProjectsComponent } from "./cabinet/user-projects/user-projects.component";
import { AngularYandexMapsModule } from "angular8-yandex-maps";
import { InputWidthDirective } from "./directives/input-width.directive";
import { SpinnerComponent } from "./spinner/spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule, MatRadioModule, MatSliderModule } from "@angular/material";
import { RestorePasswordComponent } from "./login/password-restore/restore-password/restore-password.component";
import { CreatePasswordComponent } from "./login/password-restore/create-password/create-password.component";
import { VerificationCodeComponent } from "./login/password-restore/verification-code/verification-code.component";
import { BoardAdminComponent } from "./board-admin/board-admin.component";
import { BoardUserComponent } from "./board-user/board-user.component";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";

// определение маршрутов
const appRoutes: Routes = [
  { path: "", component: AboutComponent },
  { path: "services", component: ServicesComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "contacts", component: ContactsComponent },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "cabinet", component: CabinetComponent },
  { path: "projects/project/:id", component: ProjectComponent },
  { path: "popup", component: PopupComponent },
  { path: "restore-password", component: RestorePasswordComponent },
  { path: "create-password", component: CreatePasswordComponent },
  { path: "verification-code", component: VerificationCodeComponent },
  { path: "confirm-reset", component: CreatePasswordComponent },
  { path: "**", component: NotFoundComponent }
];

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
    SpinnerComponent,
    RestorePasswordComponent,
    CreatePasswordComponent,
    RestorePasswordComponent,
    VerificationCodeComponent,
    BoardAdminComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularYandexMapsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
