import { defineConfig } from 'tsdown';


export default defineConfig({
    entry: './src/index.ts',
    format: [
        'esm',
        'iife',
    ],
    globalName: 'Elman',
});
