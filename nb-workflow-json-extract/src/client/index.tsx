import { Plugin } from '@nocobase/client';
import WorkflowPlugin from '@nocobase/plugin-workflow/client';
import JsonExtract from './JsonExtract';

export class NocobaseWorkflowJsonExtractClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    const workflow = this.app.pm.get('workflow') as WorkflowPlugin;
    const jsonExtract = new JsonExtract();
    workflow.instructions.register(jsonExtract.type, jsonExtract);
  }
}

export default NocobaseWorkflowJsonExtractClient;
