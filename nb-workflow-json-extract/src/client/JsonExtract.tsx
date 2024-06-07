import React from 'react';

import { SchemaInitializerItemType, Variable, useCollectionManager_deprecated } from '@nocobase/client';
import {
  BaseTypeSets,
  Instruction,
  ValueBlock,
  WorkflowVariableInput,
  defaultFieldNames,
  useWorkflowVariableOptions,
} from '@nocobase/plugin-workflow/client';
import { NAMESPACE, useLang } from '../locale';

function jsonExtractCollectionFieldMatcher(field): boolean {
  if (!['belongsTo', 'hasOne'].includes(field.type)) {
    return false;
  }

  if (this.getCollection(field.collectionName)?.template === 'expression') {
    return true;
  }

  const fields = this.getCollectionFields(field.target);
  return fields.some((f) => f.interface === 'expression');
}

function JsonExtract({ value, onChange }) {
  const { getCollectionFields, getCollection } = useCollectionManager_deprecated();
  const scope = useWorkflowVariableOptions({
    types: [jsonExtractCollectionFieldMatcher.bind({ getCollectionFields, getCollection, console })],
  });

  return <Variable.Input value={value} onChange={onChange} scope={scope} />;
}

export default class extends Instruction {
  title = `{{t("JSON Extract", { ns: "${NAMESPACE}" })}}`;
  type = 'quark-json-extract';
  group = 'extended';
  description = `{{t("Extract JSON values from scope", { ns: "${NAMESPACE}" })}}`;
  fieldset = {
    scope: {
      type: 'string',
      title: `{{t("Scope", { ns: "${NAMESPACE}" })}}`,
      'x-decorator': 'FormItem',
      'x-component': 'WorkflowVariableInput',
      'x-component-props': {
        changeOnSelect: true,
        variableOptions: {
          types: [{ type: 'reference', options: { collection: '*', entity: true } }],
        },
      },
      required: true,
    },
    daisyPath: {
      type: 'string',
      title: `{{t("Path", { ns: "${NAMESPACE}" })}}`,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['scope'],
        fulfill: {
          state: {
            visible: '{{$deps[0]}}',
          },
        },
      },
      required: true,
    },
    failOnEmpty: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-content': `{{t("Exit when query result is not found", { ns: "${NAMESPACE}" })}}`,
    },
  };
  components = {
    JsonExtract,
    WorkflowVariableInput,
    ValueBlock,
  };
  useVariables({ key, title }, { types, fieldNames = defaultFieldNames }) {
    if (
      types &&
      !types.some((type) => type in BaseTypeSets || Object.values(BaseTypeSets).some((set) => set.has(type)))
    ) {
      return null;
    }
    return {
      [fieldNames.value]: key,
      [fieldNames.label]: title,
    };
  }
  useInitializers(node): SchemaInitializerItemType {
    return {
      name: `#${node.id}`,
      type: 'item',
      title: node.title ?? `#${node.id}`,
      Component: ValueBlock.Initializer,
      node,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      resultTitle: useLang('JSON Extract result'),
    };
  }
}
