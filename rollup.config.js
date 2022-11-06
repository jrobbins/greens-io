import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'client_src/index.js',
  output: {
    dir: 'static/dist',
    format: 'es'
  },
  plugins: [
    nodeResolve(),

    // Copy Shoelace assets to dist/shoelace
    copy({
      targets: [
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets',
          dest: 'static/dist/shoelace'
        }
      ]
    }),

    // Copy Shoelace CSS to dist/shoelace
    copy({
      targets: [
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/themes',
          dest: 'static/dist'
        }
      ]
    })

  ]
};
