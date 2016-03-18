var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var build = require('gulp-build');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// Paths
var GLOBAL_SCRIPTS = './js/**/*.js';
var GLOBAL_SASS =  './sass/**/*.scss';
// if browser plugin is not available, load this last just before the closing body tag
// var LIVE_RELOAD_SCRIPT = '<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>';

// jshint
gulp.task('jshint', function() {
  console.log('jshint is running YO!');
  return gulp.src(GLOBAL_SCRIPTS)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
// Javascript
gulp.task('scripts', ['jshint'], function(){
  return gulp.src(GLOBAL_SCRIPTS)
   .pipe(concat('app.js'))
   .pipe(gulp.dest('dist/js'))
   .pipe(livereload());
});

// sass

gulp.task('sass', function(){
   return  gulp.src(GLOBAL_SASS)
  .pipe(sass('style.css').on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(gulp.dest('dist/css'))
  .pipe(livereload());
});

// add dependencies to index.html
gulp.task('index', function(){
  var target = gulp.src('index.html');
  var sources = gulp.src([GLOBAL_SCRIPTS], {read: false});

  return target.pipe(inject(sources))
     .pipe(gulp.dest('./dist'));

});

// build command

gulp.task('html', function(){
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  require('./server.js')

  gulp.watch('index.html',['html']);
  gulp.watch(GLOBAL_SCRIPTS, ['scripts']);
  gulp.watch(GLOBAL_SASS, ['sass']);
  livereload.listen();
})
