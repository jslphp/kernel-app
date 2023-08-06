const { watch, series, parallel, src, dest } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
sass.compiler = require('node-sass');

const paths = {
    dist: '../../../public/static',
    sass: './scss',
    js: './js',
    nodeModules: './node_modules'
};


/**
 * Concatenate JS files
 */
function js(cb) {
    return src([
            paths.js + '/helpers/*.js',
            paths.js + '/pages/*.js',
            paths.js + '/main.js',
        ])
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(dest(paths.dist));}


/**
 * Build sass files
 */
function css() {
    return src([
            paths.sass + '/main.scss'
        ])
        .pipe(concat('main.css'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(dest(paths.dist));
}


/**
 * Export tasks
 */
exports.default = function () {
    // CSS
    watch([
            paths.sass + '/**/*.scss',
        ],
        {
            ignoreInitial: false
        },
        series(css)
    );

    //JS
    watch([
            paths.js + '/*.js',
            paths.js + '/**/*.js'
        ],
        {
            ignoreInitial: false
        },
        series(js)
    );  
};
