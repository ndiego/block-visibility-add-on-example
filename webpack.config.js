const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

module.exports = {
    ...defaultConfig,

    entry: {
        'block-visibility-add-on-example-editor' : path.resolve( process.cwd(), 'src/editor/index.js' ),
        'block-visibility-add-on-example-settings' : path.resolve( process.cwd(), 'src/settings/index.js' ),
        'block-visibility-add-on-example-editor-styles': path.resolve( process.cwd(), 'src/styles/editor.scss' ),
        'block-visibility-add-on-example-setting-styles' : path.resolve( process.cwd(), 'src/styles/settings.scss' ),
    },

    output: {
        filename: '[name].js',
        path: path.resolve( process.cwd(), 'build/' ),
    },

    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            // Add additional rules as needed.
        ]
    },

    plugins: [
        ...defaultConfig.plugins,
        // Add additional plugins as needed.
        new RemoveEmptyScriptsPlugin(),
    ],
};
