import { FlowNodeModel, Instruction, JOB_STATUS, Processor } from '@nocobase/plugin-workflow';
import { parse } from '@nocobase/utils';
import lodash from 'lodash';
import { useLang } from '../locale';

const missingSymbol = Symbol('QuarkWjeMissingValue');

export class JsonExtract extends Instruction {
  async run(node: FlowNodeModel, prevJob, processor: Processor) {
    const { daisyPath, failOnEmpty = false } = node.config;
    let scope = processor.getScope(node.id);

    const parsedPath = parse(daisyPath)(scope) ?? '';
    scope = parse(node.config.scope ?? {})(scope) ?? {};

    const resultValue = lodash.get(scope, parsedPath, missingSymbol);
    const isEmptyResult = resultValue === missingSymbol;

    if (failOnEmpty && isEmptyResult) {
      return {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        result: useLang('Value in current scope not found'),
        status: JOB_STATUS.FAILED,
      };
    }

    return {
      result: isEmptyResult === false ? resultValue : undefined,
      status: JOB_STATUS.RESOLVED,
    };
  }
}
