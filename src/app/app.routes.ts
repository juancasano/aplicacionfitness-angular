import { Routes } from '@angular/router';
import { AppV1 } from './app';
import { AppV2 } from './app-v2.component';
import { AppV3 } from './app-v3.component';
import { AppV4 } from './app-v4.component';
import { AppV5a } from './app-v5a.component';
import { AppV5b } from './app-v5b.component';
import { AppV6 } from './app-v6.component';

export const routes: Routes = [
  { path: '', component: AppV1 },
  { path: 'v2', component: AppV2 },
  { path: 'v3', component: AppV3 },
  { path: 'v4', component: AppV4 },
  { path: 'v5a', component: AppV5a },
  { path: 'v5b', component: AppV5b },
  { path: 'v6', component: AppV6 }
];