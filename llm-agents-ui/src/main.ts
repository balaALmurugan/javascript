import { bootstrapApplication } from '@angular/platform-browser';
import { ChatDashboardComponent } from './app/chat/chat';

bootstrapApplication(ChatDashboardComponent)
  .catch((err) => console.error(err));
