/* File: gulpfile.js */
'use strict';

var gulp   = require('gulp'),
    sass =   require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    uncss  = require('gulp-uncss'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    bless = require('gulp-bless'),
    gcmq = require('gulp-group-css-media-queries'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    size =require('gulp-size'),
    uglify = require('gulp-uglify');

/* config */

var AUTOPREFIXER_BROWSERS = [
  '> 1%',
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];

var onError =function(err) {
  console.log(err.toString());
  this.emit('end');
};

/* styles */

gulp.task('styles',function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(plumber({
       errorHandler: onError
    }))
    .pipe(sass({
      style:'expanded'
    }))
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS,
      cascade:false
    }))
    .pipe(csscomb())
    .pipe(gulp.dest('public/assets/stylesheet'))
    .pipe(uncss({
            html: ['index.html', 'source/**/*.html']
    }))
    .pipe(minifyCSS())
    .pipe(rename({suffix:".min"}))
    .pipe(bless())
    .pipe(gulp.dest('public/assets/stylesheet'))
    .pipe(size({title:'css'}));
});

/* scripts */

gulp.task('scripts',function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/assets/javascript'))
    .pipe(rename({suffix:".min"}))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/javascript'))
    .pipe(size({title:'js'}));
});

/* HTML task */

gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  return gulp.src('source/*.{html,php}')
         .pipe(gulp.dest('public'));
});

/* Images task */

gulp.task('copyImages', function() {
  // copy any html files in source/ to public/
  gulp.src('source/images/*.{png,gif,jpg,jpeg,svg}').pipe(gulp.dest('public/assets/images'));
});


gulp.task('default',[],function() {
  gulp.start('watch','styles','scripts','copyImages','copyHtml');
});

gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js',['scripts']);
  gulp.watch('source/scss/**/*.scss',['styles']);
  gulp.watch('source/images/*.{png,gif,jpg,jpeg,svg}', ['copyImages']);
  gulp.watch('source/*.html', ['copyHtml']);
});
