import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentsService } from '../../../core/agents';

@Component({
  selector: 'app-agents-list',
  imports: [RouterLink],
  templateUrl: './agents-list.html',
  styleUrl: './agents-list.scss'
})
export class AgentsList {
  private readonly agentsService = inject(AgentsService);
  protected readonly agents = computed(() => this.agentsService.getAgents()());
}
