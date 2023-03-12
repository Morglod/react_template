import * as esbuild from 'esbuild';
import { esbuildConfig } from "./config.mjs";

await esbuild.build({
    ...esbuildConfig,
    minify: true
});
