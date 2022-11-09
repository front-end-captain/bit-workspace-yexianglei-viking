import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react'; // the node env uses the react env's preview feature
// uncomment the line below and install the theme if you want to use our theme or create your own and import it here
// import { ThemeCompositions } from '@teambit/documenter.theme.theme-compositions';

import { GeneratorEnvAspect } from './generator-env.aspect';

export class GeneratorEnvPreviewMain {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const generatorEnvPreviewMain = new GeneratorEnvPreviewMain();
    // uncomment the line below to register a new provider to wrap all compositions using this environment with a custom theme.
    // react.registerProvider([ThemeCompositions]);

    return generatorEnvPreviewMain;
  }
}

GeneratorEnvAspect.addRuntime(GeneratorEnvPreviewMain);
