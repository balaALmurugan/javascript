import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentsService, AgentDetail as AgentDetailModel } from '../../../core/agents';

@Component({
  selector: 'app-agent-detail',
  imports: [],
  templateUrl: './agent-detail.html',
  styleUrl: './agent-detail.scss'
})
export class AgentDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly agentsService = inject(AgentsService);

  protected readonly id = computed(() => this.route.snapshot.paramMap.get('id') ?? '');
  protected readonly agent = computed<AgentDetailModel | undefined>(() => this.agentsService.getAgent(this.id()));
}
