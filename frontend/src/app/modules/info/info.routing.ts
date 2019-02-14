import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from './components/info.component';

const routes: Routes = [
  {
    path: '', component: InfoComponent
  }
]as Routes;

export const infoRouting: ModuleWithProviders = RouterModule.forChild(routes);
