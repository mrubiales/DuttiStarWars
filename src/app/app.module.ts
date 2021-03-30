import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { PrincipalModule } from "./pages/principal/principal.module";
import { SharedModule } from "./shared/shared.module";
import { HttpRequestInterceptor } from "./core/interceptor/http-request.interceptor";

// Components
import { AppComponent } from "./app.component";
import { PrincipalComponent } from "./pages/principal/principal.component";

@NgModule({
  declarations: [AppComponent, PrincipalComponent],
  imports: [BrowserModule, AppRoutingModule, PrincipalModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
