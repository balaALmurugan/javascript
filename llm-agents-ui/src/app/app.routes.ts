import { Routes } from '@angular/router';
import { AgentsList } from './features/agents/agents-list/agents-list';
import { AgentDetail } from './features/agents/agent-detail/agent-detail';
import { Playground } from './features/playground/playground';
import { Settings } from './features/settings/settings';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'agents' },
  { path: 'agents', component: AgentsList },
  { path: 'agents/:id', component: AgentDetail },
  { path: 'playground', component: Playground },
  { path: 'settings', component: Settings },
  { path: '**', redirectTo: 'agents' },
];
