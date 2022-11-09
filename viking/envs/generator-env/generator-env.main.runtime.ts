import { MainRuntime } from '@teambit/cli';
import { NodeAspect, NodeMain } from '@teambit/node';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { BabelAspect, BabelMain } from '@teambit/babel';
import { ReactAspect, ReactMain } from '@teambit/react';
import type {
  UseTypescriptModifiers,
  UseWebpackModifiers,
} from '@teambit/react';
import type { TsConfigTransformer } from '@teambit/typescript';
import { GeneratorEnvAspect } from './generator-env.aspect';
import { CompilerAspect, CompilerMain } from '@teambit/compiler';
import { AspectLoaderAspect, AspectLoaderMain } from '@teambit/aspect-loader';
import { babelConfig } from './babel-config';
import { AspectEnv } from './aspect.env';

//import {
//  previewConfigTransformer,
//  devServerConfigTransformer
//} from './webpack/webpack-transformers';
//import {
//  devConfigTransformer,
//  buildConfigTransformer,
//} from "./typescript/ts-transformer";

const tsconfig = require('./typescript/tsconfig.json');

export class GeneratorEnvMain {
  static slots = [];

  static dependencies = [
    NodeAspect,
    EnvsAspect,
    BabelAspect,
    ReactAspect,
    CompilerAspect,
    AspectLoaderAspect,
  ];

  static runtime = MainRuntime;

  static async provider([node, envs, babel, react, compiler, aspectLoader]: [
    NodeMain,
    EnvsMain,
    BabelMain,
    ReactMain,
    CompilerMain,
    AspectLoaderMain
  ]) {
    //const webpackModifiers: UseWebpackModifiers = {
    //  previewConfig: [previewConfigTransformer],
    //  devServerConfig: [devServerConfigTransformer],
    //};

    //const tsModifiers: UseTypescriptModifiers = {
    //  devConfig: [devConfigTransformer],
    //  buildConfig: [buildConfigTransformer],
    //};

    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig,
      distDir: 'dist',
      distGlobPatterns: [
        `dist/**`,
        `!dist/**/*.d.ts`,
        `!dist/tsconfig.tsbuildinfo`,
      ],
    });

    const compilerOverride = envs.override({
      getCompiler: () => {
        return babelCompiler;
      },
    });

    const transformer: TsConfigTransformer = (config) => {
      config
        .mergeTsConfig(tsconfig)
        .setArtifactName('declaration')
        .setDistGlobPatterns([`dist/**/*.d.ts`])
        .setShouldCopyNonSupportedFiles(false);
      return config;
    };
    const tsCompiler = react.env.getCjsCompilerTask([transformer]);

    const compilerTasksOverride = react.overrideCompilerTasks([
      compiler.createTask('BabelCompiler', babelCompiler),
      tsCompiler,
    ]);

    const aspectEnv = react.compose(
      [compilerOverride, compilerTasksOverride],
      new AspectEnv(react.reactEnv, aspectLoader)
    );

    envs.registerEnv(aspectEnv);
    return new GeneratorEnvMain();
  }
}

GeneratorEnvAspect.addRuntime(GeneratorEnvMain);
