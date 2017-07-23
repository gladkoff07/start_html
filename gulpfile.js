'use strict';

let gulp = require('gulp'),
	gulpAutoprefixer = require('gulp-autoprefixer'),
	gulpClean = require('gulp-clean'),
	gulpCleanCSS = require('gulp-clean-css'),
	gulpIf = require('gulp-if'),
	gulpUglify = require('gulp-uglify'),
	gulpUseref = require('gulp-useref'),
	gulpSpritesmith = require('gulp.spritesmith'),
	wiredep = require('wiredep').stream,
	gulpSass = require('gulp-sass'),
  merge = require('merge-stream'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  plumber = require('gulp-plumber'),
  tinypng = require('gulp-tinypng-extended');

// bower
gulp.task('bower', () => {
  gulp.src('./app/*.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

// clean
gulp.task('clean', () => {
    return gulp.src('dist/', {read: false})
        .pipe(gulpClean());
});

// img optim
gulp.task('tinypng', () => {
    gulp.src('app/sources/img/**/*.{png,jpg,jpeg}')
        .pipe(plumber())
        .pipe(tinypng({
            key: 'API_KEY',
            sigFile: 'app/sources/img/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('app/img'));
});

// server
gulp.task('connect', () => {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// sprite
gulp.task('sprite', () => {
  var spriteData = gulp.src('app/sources/sprite/*.{png,jpg,jpeg}').pipe(gulpSpritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 10
  }));
  let imgStream = spriteData.img.pipe(gulp.dest('app/img')),
    cssStream = spriteData.css.pipe(gulp.dest('app/scss'));
  return merge(imgStream, cssStream);
});

// sass
gulp.task('sass', () => {
  return gulp.src('app/scss/**/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// html
gulp.task('html', () => {
 return gulp.src('app/*.html')
     .pipe(connect.reload());
});

// add img
gulp.task('img', () => {
 return gulp.src('app/img/**/*')
     .pipe(gulp.dest('dist/img'))
});

// add font
gulp.task('font', () => {
 return gulp.src('app/font/**/*')
     .pipe(gulp.dest('dist/font'))
});

// add php
gulp.task('php', () => {
 return gulp.src('app/*.php')
     .pipe(gulp.dest('dist/'))
});

// Comprese 
gulp.task('minify', () => {
  return gulp.src('app/*.html')
    .pipe(gulpUseref())
    .pipe(gulpIf('*.js', gulpUglify()))
    .pipe(gulpIf('*.css', gulpAutoprefixer({
            browsers: ['last 7 versions'],
            cascade: false
        })))
    .pipe(gulpIf('*.css', gulpCleanCSS()))
    .pipe(gulp.dest('dist'));
});

// build
gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'img', 'font', 'minify', 'php')));

gulp.task('watch', () => {
  gulp.watch('app/scss/*.scss', gulp.series('sass'));
   gulp.watch('app/*.html', gulp.series('html'));
  gulp.watch('bower.json', gulp.series('bower'));
});

// default
gulp.task('default', gulp.series('sass', gulp.parallel('watch', 'connect')));