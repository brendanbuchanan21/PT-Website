//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
    ...tanstackConfig,
   {
    plugins: {
      '@tanstack/query': pluginQuery,
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },

];
