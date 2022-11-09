import { WorkspaceContext } from '@teambit/generator';
import { getWorkspaceConfigTemplateParsed, stringifyWorkspaceConfig } from '@teambit/config';

export async function workspaceConfig({ name, defaultScope }: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();

  configParsed['teambit.workspace/workspace'].name = name;
  configParsed['teambit.workspace/workspace'].defaultScope = defaultScope || 'unknown';
  configParsed['teambit.dependencies/dependency-resolver'] = {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {
        "@babel/runtime": "7.18.9",
        "@teambit/eslint-config-bit-react": "~0.0.367",
        "@typescript-eslint/eslint-plugin": "4.29.3",
        "eslint-import-resolver-node": "0.3.6",
        "eslint-plugin-import": "2.22.1",
        "eslint-plugin-jest": "24.4.0",
        "eslint-plugin-jsx-a11y": "6.4.1",
        "eslint-plugin-mdx": "1.15.0",
        "eslint-plugin-react": "7.25.1"
      },
      "peerDependencies": {
        "@testing-library/react": "^12.1.5",
        "@types/jest": "28.1.6",
        "@types/react": ">=17.0.0 || >=18.0.0",
        "@types/react-dom": ">=17.0.0 || >=18.0.0",
        "react": ">=17.0.0 || >=18.0.0",
        "react-dom": ">=17.0.0 || >=18.0.0"
      }
    }
  },

  configParsed['teambit.workspace/variants'] = {};

  return stringifyWorkspaceConfig(configParsed);
}
