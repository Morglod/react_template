import * as esbuild from 'esbuild';
import { esbuildConfig } from "./config.mjs";

const esbuildContext = await esbuild.context(esbuildConfig);

const serving = await esbuildContext.serve({
    host: 'localhost',
    servedir: "./build",
});

console.log(`http://${serving.host}:${serving.port}/`);
