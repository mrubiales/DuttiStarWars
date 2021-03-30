import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticatedGuard } from "./core/guards/authenticated.guard";
// Components
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import(`./pages/principal/principal.module`).then(
        (m) => m.PrincipalModule
      ),
    canActivate: [AuthenticatedGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "principal",
    loadChildren: () =>
      import(`./pages/principal/principal.module`).then(
        (m) => m.PrincipalModule
      ),
    canActivate: [AuthenticatedGuard],
    runGuardsAndResolvers: "always",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
