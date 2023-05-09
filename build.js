/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');

const bootsrap = async () => {
  await esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node',
    outdir: 'dist',
    sourcemap: true,
  });
};

bootsrap();
