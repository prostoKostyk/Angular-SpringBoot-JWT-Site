import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from "./about/about.component";
import { ServicesComponent } from "./services/services.component";
import {Routes, RouterModule} from "@angular/router";
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
import { UserCompanieComponent } from "./cabinet/user-companie/user-companie.component";
import { UserProjectsComponent } from "./cabinet/user-projects/user-projects.component";
import { AngularYandexMapsModule } from "angular8-yandex-maps";
// определение маршрутов
const appRoutes: Routes = [
    { path: "", component: AboutComponent},
    { path: "services", component: ServicesComponent},
    { path: "projects", component: ProjectsComponent},
    { path: "contacts", component: ContactsComponent},
    { path: "login", component: LoginComponent},
    { path: "registration", component: RegistrationComponent},
    { path: "cabinet", component: CabinetComponent},
    { path: "projects/project/:id", component: ProjectComponent},
    { path: "popup", component: PopupComponent},
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
    UserCompanieComponent,
    UserProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularYandexMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
