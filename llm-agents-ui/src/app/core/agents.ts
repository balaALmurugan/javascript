import { Injectable, signal } from '@angular/core';

export interface AgentSummary {
  id: string;
  name: string;
  model: string;
}

export interface AgentDetail extends AgentSummary {
  description: string;
  tools: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private readonly agentList = signal<AgentSummary[]>([
    { id: 'assistant', name: 'General Assistant', model: 'gpt-4o-mini' },
    { id: 'coder', name: 'Code Assistant', model: 'o3-mini' },
    { id: 'researcher', name: 'Research Agent', model: 'deepseek-r1' },
  ]);

  private readonly agentDetails = new Map<string, AgentDetail>([
    ['assistant', {
      id: 'assistant',
      name: 'General Assistant',
      model: 'gpt-4o-mini',
      description: 'Helpful assistant for everyday tasks.',
      tools: ['search', 'summarize']
    }],
    ['coder', {
      id: 'coder',
      name: 'Code Assistant',
      model: 'o3-mini',
      description: 'Specialized in code generation and refactoring.',
      tools: ['repo', 'tests', 'lint']
    }],
    ['researcher', {
      id: 'researcher',
      name: 'Research Agent',
      model: 'deepseek-r1',
      description: 'Explores topics and produces literature reviews.',
      tools: ['web', 'notes']
    }],
  ]);

  getAgents() {
    return this.agentList.asReadonly();
  }

  getAgent(id: string): AgentDetail | undefined {
    return this.agentDetails.get(id);
  }
}
