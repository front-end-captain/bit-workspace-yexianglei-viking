import { WorkspaceContext, Starter } from '@teambit/generator';
import { workspaceConfig } from './template/files/workspace-config';
import { readme } from './template/files/readme-file';
import { gitIgnore } from './template/files/git-ignore';
import { npmrc } from './template/files/npmrc-file';

export const starter: Starter = {
  name: 'dp-workspace-generator',
  description: 'demonstration of a workspace template for DP',
  generateFiles: async (context: WorkspaceContext) => [
    {
      relativePath: 'workspace.jsonc',
      content: await workspaceConfig(context),
    },
    {
      relativePath: '.gitignore',
      content: gitIgnore(),
    },
    {
      relativePath: 'README.md',
      content: readme(),
    },
    {
      relativePath: '.npmrc',
      content: npmrc(),
    },
  ],
};

export default starter;
