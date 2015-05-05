"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
//var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
//var sourcemaps = require('gulp-sourcemaps');
var webpack = require("gulp-webpack");
var webpackConfig = require('./webpack.config');
//var named = require('vinyl-named');
var sh = require('shelljs');

var paths = {
    sass: ['./src/scss/**/*.scss'],
    scripts: ['./src/js/**/*.js']
};

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('scripts', function () {
    //return gulp.src('./src/js/app.js')
    return gulp.src(paths.scripts)
        //.pipe(named())
        //.pipe(sourcemaps.init())
        //.pipe(concat('app.bundle.js'))
        //.pipe(sourcemaps.write())
        //.pipe(gulp.dest('./www/js/'))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./www/js/'))
        ;
});

gulp.task('sass', function (done) {
    gulp.src('./src/scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
