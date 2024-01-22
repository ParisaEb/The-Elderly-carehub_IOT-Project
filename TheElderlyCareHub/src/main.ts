import * as toastr from 'toastr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'

// Configure Toastr options
toastr.options.closeButton = true;
toastr.options.progressBar = true;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
