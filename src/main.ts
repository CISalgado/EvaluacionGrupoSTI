import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/components/home-component/home-component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(HomeComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: HomeComponent },
    ])
  ]
});
