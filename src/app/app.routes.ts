import { Routes } from '@angular/router';

import { AppV1 } from './app';
import { AppV2 } from './app-v2.component';

export const routes: Routes = [
  { path: '', component: AppV1 },
  { path: 'v2', component: AppV2 }
];
