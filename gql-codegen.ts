import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/graphql/schema.json',
  documents: ['src/graphql/*.tsx', 'src/graphql/*.ts'],
  generates: {
    './src/generated/': {
      preset: 'client',
    },
  },
  config: {
    namingConvention: 'keep',
  },
};

export default config;
