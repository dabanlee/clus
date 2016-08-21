import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
import config, { paths } from './rollup.config';

export default {
    format: 'umd', // 'amd', 'cjs', 'es', 'iife', 'umd'
    moduleName: config.moduleName,
    moduleId: config.moduleId,
    entry: `${paths.source.root}index.js`,
    dest: `${paths.dist.root}${config.fileName}.min.js`,
    sourceMap: true,
    plugins: [
        babel(),
        sourcemaps(),
        uglify(),
    ],
};
