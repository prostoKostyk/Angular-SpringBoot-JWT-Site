import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { ServicesComponent } from "./components/services/services.component";
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
import { BrowserModule } from "@angular/platform-browser";
import { RestorePasswordComponent } from "./components/login/password-restore/restore-password/restore-password.component";
import { CreatePasswordComponent } from "./components/login/password-restore/create-password/create-password.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
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
{ path: "confirm-reset", component: CreatePasswordComponent },
{ path: "projects/project/:id/user/:userid", component: UserInfoComponent },
{ path: "**", component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
