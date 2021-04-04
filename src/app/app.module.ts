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
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StarshipsReducer } from "./core/reducers/starships.reducer";
import { StarshipsEffects } from "./core/effects/starships.effects";

@NgModule({
  declarations: [AppComponent, PrincipalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule,
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([StarshipsEffects]),
    StoreModule.forRoot({ starships: StarshipsReducer }),
  ],
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
