"use strict";

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    del = require('del');

// styles
gulp.task('styles', function stylesTask() {
    return sass('src/scss/style.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

// clean
gulp.task('clean', function cleanTask() {
    return del(['dist/css']);
});

// default
gulp.task('default', ['clean'], function defaultTask() {
    gulp.start('styles');
});

// watch
gulp.task('watch', function watchTask() {
    gulp.watch('src/scss/**/*.scss', ['styles']);

    livereload.listen();
    gulp.watch(['dist/*']).on('change', livereload.changed);
});