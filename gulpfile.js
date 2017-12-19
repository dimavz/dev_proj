/**
 * Created by Дмитрий on 19.12.2017.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    webserver = require('gulp-webserver');

var config ={
    paths:{
        scss:'src/scss/**/*.scss',
        html:'src/**/*.html'
    },
    output:{
        nameFileCss:'main.css',
        pathCss:'src/css'
    },
    srv_options:{
        basePath:'src/'
    }
};

gulp.task('webserver', function() {
    gulp.src(config.srv_options.basePath)
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            path: 'src/',
            fallback: 'index.html'
        }));
});

gulp.task('scss', function () {
    gulp.src(config.paths.scss)
        .pipe(sass())
        .pipe(concat(config.output.nameFileCss))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(config.output.pathCss));
});

gulp.task('watch',['scss'], function () {
    gulp.watch(config.paths.scss, ['scss', 'webserver']);
    gulp.watch(config.paths.html,['webserver']);
});


