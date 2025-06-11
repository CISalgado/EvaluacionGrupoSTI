import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HomeComponent } from './app/components/home-component/home-component';
import { CharacterDetailComponent } from './app/components/character-detail-component/character-detail-component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'character/:id', component: CharacterDetailComponent },
    ])
  ]
});