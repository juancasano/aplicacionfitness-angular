import { Routes } from '@angular/router';

import { AppV1 } from './app';
import { AppV2 } from './app-v2.component';
import { AppV3 } from './app-v3.component';

export const routes: Routes = [
  { path: '', component: AppV1 },
  { path: 'v2', component: AppV2 },
  { path: 'v3', component: AppV3 }
];
