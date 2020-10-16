const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    csso = require('gulp-csso'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    del = require('del'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

const scss = () => {
    return gulp.src('src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/css/'))
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
};
exports.scss = scss;

const js = () => {
    return gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/js'))
        .pipe(browserSync.stream());
};
exports.js = js;

const html = () => {
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
};
exports.html = html;

const img = () => {
    return gulp.src('src/img/**/*.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(webp())
        .pipe(gulp.dest('dist/img')); 
};
exports.img = img;

const favicons = () => {
    return gulp.src('src/img/**/*.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(webp())
        .pipe(gulp.dest('dist/img')); 
};
exports.favicons = favicons;

const fonts = () => {
    return gulp.src('src/fonts/**/*{woff,woff2}')
        .pipe(gulp.dest('dist/fonts'));
};
exports.fonts = fonts;

const clear = () => {
    return del('dist');
};
exports.clear = clear;

const serve = () => {
    browserSync.init({
        server: 'dist'
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/*.js', gulp.series('js'));
    gulp.watch('src/html/**/*.html', gulp.series('html'));
    gulp.watch('src/img/**/*{jpg,png,svg}', gulp.series('img'));
};
exports.serve = serve;
exports.default = serve;

const build = gulp.series(
    clear,
    gulp.parallel(
        scss,
        js,
        html,
        fonts,
        img,
        favicons
    ),
);
exports.build = build;

exports.start = gulp.series(
    build,
    serve
);
