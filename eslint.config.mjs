import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  {
    // Vendored shadcn/ui primitives predate the react-hooks purity rules
    // shipped in this eslint-config-next version; don't fail the build on them.
    files: ['components/ui/**', 'hooks/**'],
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
];

export default eslintConfig;
