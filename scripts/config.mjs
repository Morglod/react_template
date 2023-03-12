import inlineImage from "esbuild-plugin-inline-image";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

/** @type {import("esbuild").BuildOptions} */
export const esbuildConfig = {
    entryPoints: ["./src/index.tsx", "./src/index.html", "./src/manifest.json"],
    outdir: "./build",
    bundle: true,
    loader: {
        ".js": "tsx",
        ".ts": "tsx",
        ".html": "copy",
        ".json": "dataurl"
    },
    plugins: [
        inlineImage(),
        sassPlugin({
            async transform(source) {
                const { css } = await postcss([autoprefixer]).process(source);
                return css;
            },
        }),
    ],
};