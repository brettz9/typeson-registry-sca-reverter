import babel from 'rollup-plugin-babel';

export default [{
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'typesonRegistrySCAReverter'
    },
    plugins: [
        babel()
    ]
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/index-es.js',
        format: 'es'
    },
    plugins: [
        babel()
    ]
}];
