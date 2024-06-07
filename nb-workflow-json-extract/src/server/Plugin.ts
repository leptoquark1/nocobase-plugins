import { Plugin } from '@nocobase/server';
import WorkflowPlugin from '@nocobase/plugin-workflow/src/server/Plugin';
import { JsonExtract } from './JsonExtract';
import { deDE, enUS, NAMESPACE } from '../locale';

export class Leptoquark1WorkflowJsonExtractServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {
    this.app.i18n.addResources('en-US', NAMESPACE, enUS);
    this.app.i18n.addResources('de-DE', NAMESPACE, deDE);
  }

  async load() {
    const workflowPlugin = this.app.getPlugin<WorkflowPlugin>(WorkflowPlugin);
    workflowPlugin.registerInstruction('quark-json-extract', JsonExtract);
  }
}

export default Leptoquark1WorkflowJsonExtractServer;
