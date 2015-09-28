var gulp = require('gulp');
var jade = require('gulp-jade');
var ts = require('gulp-typescript');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var min = require('gulp-uglify');
var anotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var cssMin = require('gulp-uglifycss');
var cache = require('gulp-changed');
var condition = require('gulp-if');
var fileSize = require('gulp-filesize');
var settings = require('./package.json');
var ingore = require('gulp-ignore');

// HTML
gulp.task('jadeToHtml', function() {
  return gulp.src('modules/**/*.jade')
    .pipe(cache('jadeToHtml'))
    .pipe(jade())
    .pipe(gulp.dest('public'));
});

gulp.task('watchJade', ['jadeToHtml'], function() {
  return gulp.watch('modules/**/*.jade', ['jadeToHtml'])
});

//CSS
gulp.task('lessToCss', function() {
  return gulp.src('modules/**/*.less')
    .pipe(cache('lessToCss'))
    .pipe(less())
    .pipe(concat('site.min.css'))
    .pipe(condition(!settings.isDev, cssMin()))
    .pipe(gulp.dest('public'));
});

gulp.task('watchLess', ['lessToCss'], function() {
  return gulp.watch('modules/**/*.less', ['lessToCss'])
});

// BASIC WEB SETUP
gulp.task('basicJsSetup', function(){
  return gulp.src(['./typings/**/*.d.ts', 'modules/*.ts'])
  .pipe(ts())
  .pipe(condition(!settings.isDev, min()))
  .pipe(gulp.dest('public'));
});
//LIB
gulp.task('fontsCopy', function(){
  return gulp.src('node_modules/font-awesome/fonts/*.*')
  .pipe(gulp.dest('public/fonts'))

});
gulp.task('libCopy', ['fontsCopy'], function(){
  return gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/angular-resource/angular-resource.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/angular-material/angular-material.{js,css}',
    'node_modules/requirejs/require.js',
    'node_modules/font-awesome/css/font-awesome.css'
  ])
  .pipe(gulp.dest('public/lib'));
});


// site.js
gulp.task('createSite', function() {
     return gulp.src(['typings/**/*.ts', 'modules/**/*.d.ts', 'modules/app/*.ts'])
          .pipe(cache('createSite'))
          .pipe(ts())
          .pipe(anotate())
          .pipe(concat('site.js'))
          .pipe(condition(!settings.isDev, min()))
          .pipe(gulp.dest('public'));
});

// gulp.task('createSite', function() {
//   return gulp.src(['typings/**/*.ts', 'modules/**/setup.ts', 'modules/**/*-directives.ts', 'modules/app/filtes/*-filter.ts'])
//     .pipe(ingore('*node.d.ts'))
//     .pipe(cache('createSite'))
//     .pipe(ts())
//     .pipe(anotate())
//     .pipe(concat('site.min.js'))
//     .pipe(condition(!settings.isDev, min()))
//     .pipe(gulp.dest('public'));
// });
//
// gulp.task('createServer', function(){
//   return gulp.src(['typings/**/*.ts', 'modules/**/*-api.ts'])
//   .pipe(ingore('*node.d.ts'))
//   .pipe(ts())
//   .pipe(gulp.dest('routes'));
// });
//
// gulp.task('watchServer', ['createServer'], function(){
//   return gulp.watch('modules/**/*-controller.ts', ['createServer'])
// });
//
// gulp.task('createControllers', function() {
//   return gulp.src(['typings/**/*.ts', 'modules/**/*-controller.ts', 'modules/**/*-filters.ts', 'modules/**/*-viewModel.ts'])
//   .pipe(ingore('*node.d.ts'))
//     .pipe(cache('createControllers'))
//     .pipe(ts())
//     .pipe(anotate())
//     .pipe(condition(!settings.isDev, min()))
//     .pipe(gulp.dest('public'));
// });
//
// gulp.task('tsTojs', ['createSite', 'createControllers'], function() {
//   return gulp.src(['typings/**/*.ts', 'modules/app.ts', 'modules/main.ts'])
//   .pipe(ingore('*node.d.ts'))
//     .pipe(cache('tsTojs'))
//     .pipe(ts())
//     .pipe(anotate())
//     .pipe(condition(!settings.isDev, min()))
//     .pipe(gulp.dest('public'));
// });
//
// gulp.task('watchTs', ['jadeToHtml'], function() {
//   return gulp.watch('modules/**/*.ts', ['tsTojs'])
// });



gulp.task('default', ['jadeToHtml', 'tsTojs'], function() {});

gulp.task('watch', ['watchTs', 'watchJade', 'watchLess', 'watchServer'], function() {
});
