import { useTranslation } from 'react-i18next';

export const NAMESPACE = '@leptoquark/nb-workflow-json-extract';

export { default as enUS } from './en-US';
export { default as deDE } from './de-DE';

export function useLang(key: string, options = {}) {
  const { t } = useTranslation(NAMESPACE, options);
  return t(key);
}

export function usePluginTranslation(options) {
  return;
}
